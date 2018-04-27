const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: { type: String, required: true },
    items: [{ id: Number, task: String, completed: Boolean }]
});

module.exports = mongoose.model('Todo', TodoSchema);