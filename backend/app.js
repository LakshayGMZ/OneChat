const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors')

const { User } = require("./models/user")
const auth = require('./routes/auth');
const api = require('./routes/api');

const app = express();

function errorHandler (err, req, res, next) {
  console.log(err);
  res.status(400);
  res.render('error', { error: err });
}

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/auth', auth);
app.use('/api', api)

module.exports = app;
