const pool = require('../config/db');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const query = `INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [name, email, password]);

        return res.status(201).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error creating user' });
    }
};

const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "user"');
        return res.status(200).json(result.rows);
    } catch (e) {
        return res.status(500).json({ error: 'Error fetching users' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM "user" WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error deleting user' });
    }
};

module.exports = { createUser, deleteUser, getUsers };