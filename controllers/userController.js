const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = (username, callback) => {
    const query = {username: username};
    User.findOne(query, callback);
};

module.exports.comparePassword = (enteredPassword, hash, callback) => {
    bcrypt.compare(enteredPassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

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

