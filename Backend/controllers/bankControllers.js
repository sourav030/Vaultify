const pool = require('../config/dbConnection');

//--------------------------------------------------------CREATE BANK------------------------------------------------

const createBank = async (req, res) => {
    const { bank_name, location, total_money } = req.body;
    try {
        // Check if bank already exists
        const [rows] = await pool.query(
            'SELECT bank_name FROM banks WHERE bank_name = ?',
            [bank_name]
        );

        if (rows.length > 0) {
            return res.status(300).json({ message: 'Bank is already created' });
        }

        // Insert new bank
        await pool.query(
            'INSERT INTO banks (bank_name, location, total_money) VALUES (?, ?, ?)',
            [bank_name, location, total_money]
        );

        return res.status(200).json({ message: "Bank created successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server side error", error: err.message });
    }
};

//----------------------------------------------------------Delete Bank----------------------------------------------------

const deleteBank = async (req, res) => {
    const { id } = req.body; // id from request body

    try {
        // Check if bank exists
        const [rows] = await pool.query(
            'SELECT * FROM banks WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Bank not found' });
        }

        // Delete bank
        await pool.query('DELETE FROM banks WHERE id = ?', [id]);

        res.status(200).json({ message: 'Bank deleted successfully' });
    } catch (err) {
        console.error(" Error deleting bank:", err.message);
        res.status(500).json({ message: 'Server side error', error: err.message });
    }
};

//-----------------------------------------------GET ALL BANK--------------------------------------------------------
const getBank = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM banks');
        res.status(200).json({
            message: "getAllBankSuccessfull",
            data: result
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Side Error" });
    }
}


module.exports = { createBank,deleteBank,getBank };
