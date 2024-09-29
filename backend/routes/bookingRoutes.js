const express = require('express');
const router = express.Router();
const { createBooking, getBookings , deleteBooking } = require('../controllers/bookingControllers');

router.post('/create',createBooking);
router.get('/',getBookings);
router.delete('/:id',deleteBooking);

module.exports = router;