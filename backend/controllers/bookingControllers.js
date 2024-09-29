const pool = require('../config/db');

const createBooking = async (req, res) => {
    try {
        const { user_id, seat_id, time_slot_id } = req.body;

        if (!user_id || !seat_id || !time_slot_id) {
            return res.status(400).json({ error: 'User ID, seat ID, and time slot ID are required' });
        }

        const query = `INSERT INTO booking (user_id, seat_id, time_slot_id) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [user_id, seat_id, time_slot_id]);

        return res.status(201).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error in creating booking' });
    }
};

const getBookings = async (req, res) => {
    try {
        const query = `SELECT * FROM booking`;
        const result = await pool.query(query);

        return res.status(200).json(result.rows);

    } catch (e) {
        return res.status(500).json({ error: 'Error in fetching bookings' });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Booking ID is required' });
        }

        const query = `DELETE FROM booking WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        return res.status(200).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error in deleting booking' });
    }
};

module.exports = { createBooking, getBookings, deleteBooking };
