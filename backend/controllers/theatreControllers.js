const pool = require('../config/db');

const createTheatre = async (req, res) => {
    try {
        const { theatre_name, theatre_location } = req.body;

        if (!theatre_location || !theatre_name) {
            return res.status(400).json({ error: 'Theatre name and location are required' });
        }

        const query = `INSERT INTO theatre (theatre_name,theatre_location) VALUES($1, $2) RETURNING *`;

        const result = await pool.query(query, [theatre_name, theatre_location]);

        return res.status(200).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error in creating theatre' });
    }
};

const getTheatre = async (req, res) => {

    try {

        const query = `SELECT * FROM THEATRE`;

        const result = await pool.query(query);

        return res.status(200).json(result.rows);

    } catch (e) {
        return res.status(500).json({ error: 'Error in fetching theatres' });
    }
};

const deleteTheatre = async (req, res) => {
    try {
       
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Theatre id is required' });
        }

        const query = `DELETE FROM theatre WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Theatre not found' });
        }

        return res.status(200).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error in deleting theatre' });
    }
};


module.exports = { createTheatre, getTheatre, deleteTheatre };