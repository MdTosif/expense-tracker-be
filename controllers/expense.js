const { Expense } = require("../models/expense");

exports.allExpense = async (req, res) => {
    try {
        const { userId } = req.query;
        const saveExpense = await Expense.find({
            ...userId ? { userId: userId } : {}
        })
        res.json(saveExpense);
    } catch (error) {

        res.status(400).json({ message: error.message });
    }
}
exports.getExpenses = async (req, res) => {
    try {
        const { userId } = req.query;
        const saveExpense = await Expense.find({
            userId : res.user.id
        })
        res.json(saveExpense);
    } catch (error) {

        res.status(400).json({ message: error.message });
    }
}

exports.addExpense = async (req, res) => {
    try {
        const { name, price, date, userId } = req.body;
        const saveExpense = await Expense.create({
            name,
            price,
            date,
            userId:res.user.id,
        });
        res.json(saveExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.body;
        const saveExpense = await Expense.deleteOne({
            _id:id
        });
        res.json(saveExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}