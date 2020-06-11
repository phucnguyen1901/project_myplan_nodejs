

const express  = require('express');
const loginRouter = require('./routes/login.route');
const homeRouter = require('./routes/home.router');
const userRouter = require('./routes/users.router');
const bodyParser = require('body-parser');


const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost/my-plans',
    { useNewUrlParser:true },
    ()=> console.log("Connect DB is success")
)

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine','pug');
app.set('views','./views');
app.use(express.static('publics'))

app.use('/login',loginRouter);
app.use('/',homeRouter);
// app.use('/home')

app.use('/users',userRouter)


app.get('/ajax', (req,res) =>{
    res.render("text");
})





app.listen(port, ()=> console.log('Server started'))