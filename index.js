const express = require("express");
const loginRouter = require("./routes/login.route");
const homeRouter = require("./routes/home.router");
const Route = require("./routes/home.router");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");

require("dotenv/config");

const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("Connect DB is success")
);

const app = express();
const port = process.env.PORT || 3000;

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.Index = req.session.check;
  res.locals.Key = req.session.key;
  res.locals.Value = req.session.value;
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("publics"));

app.use("/login", loginRouter);
// app.use("/", homeRouter);

Route(app);

app.listen(port, () => console.log("Server started with port : " + port));
