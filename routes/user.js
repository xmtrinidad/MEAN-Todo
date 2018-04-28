const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const user_controller = require('../controllers/userController');

// Register a new user
router.post('/register', user_controller.user_register);

router.post('/authenticate', user_controller.user_authenticate);

router.post('/save', passport.authenticate('jwt', {session: false}), user_controller.user_save_todo);

router.get('/todos', passport.authenticate('jwt', {session: false}), user_controller.user_get_todos);

module.exports = router;