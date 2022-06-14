const express = require('express');
const { allExpense, addExpense, getExpenses, deleteExpense, getDayExpenses, getExpenseByNames } = require('../controllers/expense');
const { authMiddleware } = require('../controllers/auth');

const router = express.Router();

router.get('/all', authMiddleware, allExpense)
router.get('/', authMiddleware, getExpenses)
router.post('/',  authMiddleware, addExpense)
router.get('/day-chart',authMiddleware, getDayExpenses)
router.get('/expense-by-name',authMiddleware, getExpenseByNames)
router.delete('/', deleteExpense);

module.exports = router;