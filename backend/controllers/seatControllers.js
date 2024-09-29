const pool = require('../config/db');

const createSeat = async (req, res) => {
    try {
        const { screen_id } = req.body;

        if (!screen_id) {
            return res.status(400).json({ error: 'Screen ID is required' });
        }

        const query = `INSERT INTO seat (screen_id) VALUES ($1) RETURNING *`;
        const result = await pool.query(query, [screen_id]);

        return res.status(201).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error creating seat' });
    }
};

const getSeats = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM seat');
        return res.status(200).json(result.rows);
    } catch (e) {
        return res.status(500).json({ error: 'Error fetching seats' });
    }
};

const deleteSeat = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM seat WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Seat not found' });
        }

        return res.status(200).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error deleting seat' });
    }
};

module.exports = { createSeat, getSeats, deleteSeat };