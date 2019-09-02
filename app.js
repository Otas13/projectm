require('dotenv').config({path: `${__dirname}/.env`});
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'html');
app.use(sassMiddleware({
  src: path.join(__dirname, 'client/dist/projekt'),
  dest: path.join(__dirname, 'client/dist/projekt'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'client/dist/projekt')));

app.use('/', indexRouter);

// neplatna cesta bude presmerovana na root
app.use((req, res) => {
  res.redirect("/");
});

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true }, (err) => {
    if(err) return console.log(err);
    return console.log('Mongo connected');
});

module.exports = app;
