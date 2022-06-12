const express = require('express');
const { signup, login } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signup, login)
router.post('/login', login)
router.get('/logout', () => {
})

module.exports = router;