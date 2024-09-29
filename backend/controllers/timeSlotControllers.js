const pool = require('../config/db');

const createTimeSlot = async (req, res) => {
    try {
        const { start_time, end_time, slot_date, screen_id } = req.body;

        if (!start_time || !end_time || !slot_date || !screen_id) {
            return res.status(400).json({ error: 'Start time, end time, date, and screen ID are required' });
        }

        const query = `INSERT INTO time_slot (start_time, end_time, slot_date, screen_id) VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await pool.query(query, [start_time, end_time, slot_date, screen_id]);

        return res.status(201).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error creating time slot' });
    }
};

const getTimeSlots = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM time_slot');
        return res.status(200).json(result.rows);
    } catch (e) {
        return res.status(500).json({ error: 'Error fetching time slots' });
    }
};

const deleteTimeSlot = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM time_slot WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Time slot not found' });
        }

        return res.status(200).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error deleting time slot' });
    }
};

module.exports = { createTimeSlot, getTimeSlots, deleteTimeSlot };