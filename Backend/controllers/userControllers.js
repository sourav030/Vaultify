const pool = require('../config/dbConnection'); // mysql2/promise pool
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// -------------------- Create User --------------------
const createUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Check if user already exists
        const [existingUser] = await pool.query(
            'SELECT * FROM users WHERE email = ? OR phone = ?',
            [email, phone]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into DB
        const [result] = await pool.query(
            'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
            [name, email, phone, hashedPassword]
        );

        res.status(201).json({
            message: "User created successfully",
            userId: result.insertId
        });

    } catch (err) {
        console.error(" Error creating user:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// -------------------- Login --------------------
const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User is not registered" });
        }

        const user = rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.user_id, email: user.email },
            process.env.SECRET_KEY
        );


        res.status(200).json({
            message: 'User login successful',
            token
        });

    } catch (err) {
        console.error(" Error logging in:", err.message);
        res.status(500).json({ message: "Server side error" });
    }
};

module.exports = { createUser, Login };
