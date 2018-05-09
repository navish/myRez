//File for DB configurations
var mongoose = require('mongoose');
var config = require('./config.js');

var MONGODB_URI = config.database;
mongoose.connect(MONGODB_URI);