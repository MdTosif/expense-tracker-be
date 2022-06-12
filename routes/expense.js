const express = require('express');
const { allExpense, addExpense, getExpenses } = require('../controllers/expense');
const { authMiddleware } = require('../controllers/auth');

const router = express.Router();

router.get('/all', authMiddleware, allExpense)
router.get('/', authMiddleware, getExpenses)
router.post('/',  authMiddleware, addExpense)
router.put('/', () => {

})
router.delete('/', () => {

})

module.exports = router;