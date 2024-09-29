const pool = require('../config/db');

const createMovie = async (req, res) => {
    try {
        const { movie_name, duration } = req.body;

        if (!movie_name || !duration) {
            return res.status(400).json({ error: 'Movie name and duration are required' });
        }

        const query = `INSERT INTO movie (movie_name, duration) VALUES($1, $2) RETURNING *`;
        const result = await pool.query(query, [movie_name, duration]);

        return res.status(201).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error in creating movie' });
    }
};

const getMovie = async (req, res) => {
    try {
        const query = `SELECT * FROM movie`;
        const result = await pool.query(query);

        return res.status(200).json(result.rows);

    } catch (e) {
        return res.status(500).json({ error: 'Error in fetching movies' });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Movie id is required' });
        }

        const query = `DELETE FROM movie WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        return res.status(200).json(result.rows[0]);

    } catch (e) {
        return res.status(500).json({ error: 'Error in deleting movie' });
    }
};

module.exports = { createMovie, getMovie, deleteMovie };