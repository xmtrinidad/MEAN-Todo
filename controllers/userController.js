const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

exports.user_register = (req, res) => {
    res.send('NOT IMPLEMENTED: User Register POST')
};

exports.user_authenticate = (req, res) => {
    res.send('NOT IMPLEMENTED: Authenticate User Credentials POST');
};

exports.user_get_profile = (req, res) => {
    res.send('NOT IMPLEMENTED: User Profile GET');
};