const express = require('express');
const router = express.Router();
const { createTimeSlot, getTimeSlots, deleteTimeSlot } = require('../controllers/timeSlotControllers');

router.post('/create', createTimeSlot);
router.get('/', getTimeSlots);
router.delete('/:id', deleteTimeSlot);

module.exports = router;