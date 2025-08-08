const pool = require('../config/dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//----------------------------------------------------CREATE ADMIN-----------------------------------------------------
const createUser = async (req, res) => {
    const { admin_name, email, password, bank_id } = req.body;

    try {
        // Check if this bank already has an admin
        const [existingAdminForBank] = await pool.query(
            'SELECT * FROM admins WHERE bank_id = ?',
            [bank_id]
        );

        if (existingAdminForBank.length > 0) {
            return res.status(400).json({ message: "Admin for this bank already exists" });
        }

        // Check if email is already taken
        const [existingEmail] = await pool.query(
            'SELECT * FROM admins WHERE email = ?',
            [email]
        );

        if (existingEmail.length > 0) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert admin
        const [result] = await pool.query(
            'INSERT INTO admins (admin_name, email, password, bank_id) VALUES (?, ?, ?, ?)',
            [admin_name, email, hashedPassword, bank_id]
        );

        res.status(201).json({
            message: "Admin created successfully",
            adminId: result.insertId
        });

    } catch (err) {
        console.error("Error creating admin:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

//----------------------------------------------------------LOGIN ADMIN--------------------------------------------------
const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM admins WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Admin is not registered" });
        }

        const admin = rows[0];

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: admin.admin_id, email: admin.email },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Admin login successful',
            token
        });

    } catch (err) {
        console.error("Error logging in:", err.message);
        res.status(500).json({ message: "Server side error" });
    }
};

module.exports = { createUser, Login };