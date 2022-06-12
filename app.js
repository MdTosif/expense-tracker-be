const express = require('express')
const {db} = require('./models/db')
const expenseRoutes = require('./routes/expense')
const authRoutes = require('./routes/auth')
const morgan = require('morgan')

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({extended:true}));

app.use('/expense', expenseRoutes)
app.use('', authRoutes)

db.on('open', () => {
    app.listen(process.env.PORT || 3000, ()=>{
        console.log("server started running");
    })
})



