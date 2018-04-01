const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: { type: String, required: true },
    items: [{ type: String, completed: Boolean }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Todo = module.exports = mongoose.model('Todo', TodoSchema);