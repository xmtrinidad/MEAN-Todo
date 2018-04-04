const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const user_controller = require('../controllers/userController');

router.post('/register', (req, res, next) => {
    // Make new User
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        todos: []
    });

    user_controller.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'failed to register user'});
            throw err;
        }
        res.json({ success: true, msg: 'User Registered' });
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    user_controller.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        // There is no user with that username
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        user_controller.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                user_controller.createJWT(user, res);
            } else {
                return res.json({success: 'false', msg: 'Invalid credentials'});
            }
        });
    });
});

router.post('/add-todo', passport.authenticate('jwt', {session: false}), (req, res) => {
    const username = req.body.user;
    user_controller.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        const todoList = {
            title: req.body.todo.title,
            items: req.body.todo.items,
        };
        user.todos.push(todoList);
        user.save();
    });
});

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({user: req.user});
});

module.exports = router;