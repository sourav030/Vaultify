const pool = require('../config/dbConnection');

// ------------------------ Create Account ------------------------
const createAccount = async (req, res) => {
    const { bank_id, balance, account_type } = req.body;
    const user_id = req.user.id;

    try {
        const [existing] = await pool.query(
            'SELECT * FROM accounts WHERE user_id = ? ',
            [user_id]
        );

        if (existing.length >= 1) {
            return res.status(400).json({ message: 'Account already exists in this bank.' });
        }

        const [result] = await pool.query(
            'INSERT INTO accounts (user_id, bank_id, balance, account_type) VALUES (?, ?, ?, ?)',
            [user_id, bank_id, balance, account_type]
        );

        return res.status(201).json({
            message: 'User account created successfully.',
            insertId: result.insertId   // 👈 naye record ka ID bhejna best hai
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Side Error' });
    }
};

// -------------------------------------------Delete Account----------------------------------------------------
const deleteAccount = async (req, res) => {
    const { account_id } = req.params;
    const user_id = req.user.user_id;

    try {
        const [existing] = await pool.query(
            'SELECT * FROM accounts WHERE account_id = ? AND user_id = ?',
            [account_id, user_id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ message: 'Account not found or unauthorized' });
        }

        await pool.query(
            'DELETE FROM accounts WHERE account_id = ?',
            [account_id]
        );

        return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Side Error' });
    }
};

// -----------------------------------------------------------------Credit Amount---------------------------------------
const credit = async (req, res) => {
    const { accoutId, amount } = req.body;
    const user_id = req.user.id;
    const type = 'credit';

    try {
        console.log("accountId:", accoutId, "user_id:", user_id);

        const [account] = await pool.query(
            'SELECT * FROM accounts WHERE account_id = ? AND user_id = ?',
            [accoutId, user_id]
        );

        if (account.length === 0) {
            return res.status(404).json({ message: 'Account not found or unauthorized' });
        }
      

        await pool.query(
            'UPDATE accounts SET balance = balance + ? WHERE account_id = ?',
            [amount, accoutId]
        );


        return res.status(200).json({ message: `Credited ₹${amount} successfully.` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Side Error' });
    }
};

// -----------------------------------------------------Debit Amount--------------------------------------------------
const debit = async (req, res) => {
    const { account_id, amount } = req.body;
    const user_id = req.user.id;

    try {
        const [account] = await pool.query(
            'SELECT * FROM accounts WHERE account_id = ? AND user_id = ?',
            [account_id, user_id]
        );

        if (account.length === 0) {
            return res.status(404).json({ message: 'Account not found or unauthorized' });
        }

        if (account[0].balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        await pool.query(
            'UPDATE accounts SET balance = balance - ? WHERE account_id = ?',
            [amount, account_id]
        );

        return res.status(200).json({ message: `Debited ₹${amount} successfully.` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Side Error' });
    }
};

//---------------------------------------------------------Transaction -------------------------------------------------------
const transaction = async (req, res) => {
    const { receiver_account_id, amount, sender_account_id } = req.body;


    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        // Check if sender account exists
        const [senderRows] = await connection.query(
            'SELECT * FROM accounts WHERE account_id = ?',
            [sender_account_id]
        );
        if (senderRows.length === 0) {
            await connection.rollback();
            return res.status(400).json({ message: "Your account is not created" });
        }

        // Check if receiver account exists
        const [receiverRows] = await connection.query(
            'SELECT * FROM accounts WHERE account_id = ?',
            [receiver_account_id]
        );
        if (receiverRows.length === 0) {
            await connection.rollback();
            return res.status(400).json({ message: "Receiver account does not exist" });
        }

        // Check if sender has sufficient balance
        if (senderRows[0].balance < amount) {
            await connection.rollback();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Deduct amount from sender
        await connection.query(
            'UPDATE accounts SET balance = balance - ? WHERE account_id = ?',
            [amount, sender_account_id]
        );

        // Add amount to receiver
        await connection.query(
            'UPDATE accounts SET balance = balance + ? WHERE account_id = ?',
            [amount, receiver_account_id]
        );

        // Record the transaction
        await connection.query(
            'INSERT INTO transactions (sender_account_id, receiver_account_id, amount) VALUES (?, ?, ?)',
            [sender_account_id, receiver_account_id, amount]
        );

        await connection.commit();
        res.status(200).json({ message: "Transaction successful" });

    } catch (err) {
        await connection.rollback();
        console.error(err);
        res.status(500).json({ message: "Transaction failed due to server error" });
    } finally {
        connection.release();
    }
};


module.exports = {
    createAccount,
    deleteAccount,
    credit,
    debit,
    transaction
};
