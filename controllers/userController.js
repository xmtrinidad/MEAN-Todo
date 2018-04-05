const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Add a user to the database
module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

// Find a user based on username
module.exports.getUserByUsername = (username, callback) => {
    const query = {username: username};
    User.findOne(query, callback);
};

// Compare entered password with hash stored in database for the user
module.exports.comparePassword = (enteredPassword, hash, callback) => {
    bcrypt.compare(enteredPassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

// Create JWT for the user logging in
module.exports.createJWT = (user, res) => {
    const token = jwt.sign(user.toObject(), config.secret, {
        expiresIn: '604800'
    });
    res.json({
        success: true,
        token: `Bearer ${token}`,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
};

module.exports.saveUserTodoList = (user, req) => {
    const todoList = {
        title: req.body.todo.title,
        items: req.body.todo.items,
    };
    user.todos.push(todoList);
    user.save();
};

