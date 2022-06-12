const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Tosif:tosif@cluster.pxxtp.mongodb.net/expernse');

const db = mongoose.connection;

db.on('connect', () => {
    console.log("mongoose connected");
})

db.on('error', (e) => {
    console.log("error occured", e);
})

module.exports = { db: db }