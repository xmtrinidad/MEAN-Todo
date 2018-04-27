const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

exports.user_register = (req, res) => {
    // Create registered user to save
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    // Hash password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save((err, user) => {
                if (err) throw err;
                res.json({
                    success: true,
                    user: user
                });
            });
        });
    });
};

exports.user_authenticate = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username}, (err, user) => {
        if (err) throw err;
        // There is no user with that username
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        // User found, compare password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            // Password matches
            if (isMatch) {
                // Create JWT
                const token = jwt.sign(user.toObject(), config.secret, {
                    expiresIn: '604800'
                });
                // JSON response with token
                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                        username: user.username,
                        email: user.email,
                        todos: user.todos
                    }
                });
            } else {
                // Wrong credentials
                return res.json({success: false, msg: 'Wrong Credentials'})
            }
        });
    });
};

exports.user_get_profile = (req, res) => {
    res.send('NOT IMPLEMENTED: User Profile GET');
};