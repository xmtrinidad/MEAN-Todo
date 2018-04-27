const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

// Register a new user
router.post('/register', user_controller.user_register);

router.post('/authenticate', user_controller.user_authenticate);

module.exports = router;