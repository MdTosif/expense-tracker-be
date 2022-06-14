const { Expense } = require("../models/expense");

function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

function orderDays(dayData) {
    let dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return dayArray.map((el)=>[el, (dayData[el]||0)])
}

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
            userId: res.user.id
        })
        res.json(saveExpense);
    } catch (error) {

        res.status(400).json({ message: error.message });
    }
}

exports.getDayExpenses = async (req, res) => {
    try {
        let dayData = {};
        const saveExpense = await Expense.find({
            userId: res.user.id
        })
        saveExpense.forEach((el) => {
            let dayName = getDayName(el.date)
            dayData[dayName] = (dayData[dayName] || 0) + el.price
        })

        let orderedData = orderDays(dayData)

        res.json(orderedData)
    } catch (error) {

        res.status(400).json({ message: error.message });
    }
}

exports.getExpenseByNames = async (req, res) => {
    try {
        const saveExpense = await Expense.aggregate([
            {
                $group :
                  {
                    _id : "$name",
                    price: { $sum: "$price" }
                  }
               },
        ])
        res.json(saveExpense)
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
            userId: res.user.id,
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
            _id: id
        });
        res.json(saveExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}