const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const user_controller = require('../controllers/userController');

// Register a new user
router.post('/register', user_controller.user_register);

// Authenticate user trying to log in
router.post('/authenticate', user_controller.user_authenticate);

// Save user todoList
router.post('/save', passport.authenticate('jwt', {session: false}), user_controller.user_save_todo);

// Delete user todoList
router.post('/delete', passport.authenticate('jwt', {session: false}), user_controller.user_delete_todo);

// Get user todoLists
router.get('/todos', passport.authenticate('jwt', {session: false}), user_controller.user_get_todos);

module.exports = router;