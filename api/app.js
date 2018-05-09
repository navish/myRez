//This file is used for configuring the app only.
var express = require('express');
var cors = require('cors');

var app = express();
var db = require('./db.js');
var config = require('./config.js')

var UserController = require('./controllers/UserController');
app.use('/api/users', UserController);

var AuthController = require('./controllers/AuthController');
app.use('/api/sessions', AuthController);

app.use(cors({origin:'http://localhost:8100'})); //I added this line to fix 'Access-Control-Allow-Origin' error

app.set('superSecret', config.secret);

module.exports = app;