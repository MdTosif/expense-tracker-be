const mongoose = require('mongoose')
const expenseSchema = new mongoose.Schema({
    name: { type: String, },
    price: { type: Number, },
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.SchemaTypes.ObjectId }
});

const Expense = mongoose.model('expense', expenseSchema);

module.exports = { Expense }