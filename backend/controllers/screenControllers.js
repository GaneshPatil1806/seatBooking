const pool = require('../config/db');

const createScreen = async (req, res) => {
    try {
        const { screen_number, total_seats, theatre_id } = req.body;

        if (!screen_number || !theatre_id || total_seats === undefined) {
            return res.status(400).json({ error: 'Screen number, total seats, and theatre ID are required' });
        }

        const query = `INSERT INTO screen (screen_number, total_seats, theatre_id) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [screen_number, total_seats, theatre_id]);

        return res.status(201).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error creating screen' });
    }
};

const getScreens = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM screen');
        return res.status(200).json(result.rows);
    } catch (e) {
        return res.status(500).json({ error: 'Error fetching screens' });
    }
};

const deleteScreen = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM screen WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Screen not found' });
        }

        return res.status(200).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error deleting screen' });
    }
};

module.exports = { createScreen, getScreens, deleteScreen };