const express = require('express');
const router = express.Router();
const { createTheatre, getTheatre, deleteTheatre } = require('../controllers/theatreControllers');

router.post('/create',createTheatre);
router.get('/',getTheatre);
router.delete('/:id',deleteTheatre);

module.exports = router;