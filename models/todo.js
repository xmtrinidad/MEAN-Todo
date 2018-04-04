const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: { type: String, required: true },
    items: [{ type: String, completed: Boolean }]
});

const Todo = module.exports = mongoose.model('Todo', TodoSchema);