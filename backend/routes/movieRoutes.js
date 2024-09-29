const express = require('express');
const router = express.Router();
const { createMovie, getMovie, deleteMovie } = require('../controllers/movieControllers');

router.post('/create',createMovie);
router.get('/',getMovie);
router.delete('/:id',deleteMovie);

module.exports = router;