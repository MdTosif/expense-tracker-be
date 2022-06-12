const express = require('express');
const { allExpense, addExpense, getExpenses, deleteExpense, getDayExpenses } = require('../controllers/expense');
const { authMiddleware } = require('../controllers/auth');

const router = express.Router();

router.get('/all', authMiddleware, allExpense)
router.get('/', authMiddleware, getExpenses)
router.post('/',  authMiddleware, addExpense)
router.get('/day-chart',authMiddleware, getDayExpenses)
router.delete('/', deleteExpense);

module.exports = router;