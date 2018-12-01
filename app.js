const express = require('express');
const path = require('path');
const expresshbs = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const validator = require('express-validator');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const app = express();

const port = 3000 || process.env.PORT;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/task');
require('./config/passport');

// view engine setup
app.engine('.hbs', expresshbs({defaultLayout: 'layout.hbs', extname: '.hbs'}));
app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', (req, res, next)=>{
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});


app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter);

app.listen(port, ()=>{
    console.log(`Started at ${port}`);
})