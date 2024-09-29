const express = require('express');
const router = express.Router();
const { createScreen, getScreens, deleteScreen } = require('../controllers/screenControllers');

router.post('/create', createScreen);
router.get('/', getScreens);
router.delete('/:id', deleteScreen);

module.exports = router;