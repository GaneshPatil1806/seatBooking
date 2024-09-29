const express = require('express');
const router = express.Router();
const { createUser, getUsers, deleteUser } = require('../controllers/userControllers');

router.post('/create', createUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);

module.exports = router;