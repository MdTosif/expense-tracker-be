const { User } = require("../models/user");
const jwt = require('jsonwebtoken');
exports.signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const userExist = await User.findOne({
            username,
        });
        if (userExist)
            throw new Error('user exist');
        const newUser = await User.create({
            username,
            password
        });
        next()
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        let userExist = await User.findOne({
            username,
            password
        });
        if (!userExist)
            throw new Error('user don\'t exist');
        let token = jwt.sign({ id: userExist.id }, 'abcdef');
        userExist = userExist.toObject();
        userExist.token = token
        res.json(userExist)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

exports.authMiddleware = async (req, res, next) => {
    try {
        let { authorization } = req.headers;
        let userData = jwt.verify(authorization, 'abcdef');
        let userExist = await User.findById(userData.id);
        if (!userExist)
            throw new Error('user don\'t exist');
        res.user = userExist.toObject();
        res.user.id = userExist._id;
        next();
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}