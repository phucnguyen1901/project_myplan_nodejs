

const express  = require('express');
const loginRouter = require('./routes/login.route');
const homeRouter = require('./routes/home.router');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv/config');

const mongoose = require('mongoose');

mongoose.connect(
   process.env.MONGO_URL,  
  { useNewUrlParser:true },
    ()=> console.log("Connect DB is success")
)

const app = express();
const port = process.env.PORT || 3000;

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60*24 }
}))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine','pug');
app.set('views','./views');
app.use(express.static('publics'))

app.use('/login',loginRouter);
app.use('/',homeRouter);


app.listen(port, ()=> console.log('Server started with port : '+port))