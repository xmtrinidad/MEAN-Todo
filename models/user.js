const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Todo = require('./todo');
const mongooseUniqueValidator = require('mongoose-unique-validator');

// User Schema
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: []
});

UserSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', UserSchema);