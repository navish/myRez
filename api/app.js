/**
 * @author Nancy Victor 'github.com/navish' 
 * @description This file is used for configuring the app only.
*/

var express = require('express');
var cors = require('cors');

var app = express();

/* SECURITY PACKAGES 
* Helmet helps protect my app from some well known web vulnerabilities by setting appropriate HTTP header. Check out 'https://expressjs.com/en/advanced/best-practice-security.html for reference'

*/
var helmet = require('helmet');
app.use(helmet());
app.use(helmet.hpkp({
    maxAge: 3600,
    sha256s: ['AbCdEf123=', 'ZyXwVu456=']
})); // I am still trying to understand this well

var db = require('./db.js');
var config = require('./config.js')

var UserController = require('./controllers/UserController');
app.use('/api/users', UserController);

var AuthController = require('./controllers/AuthController');
app.use('/api/sessions', AuthController);

app.use(cors({ origin: 'http://localhost:8100' })); //I added this line to fix 'Access-Control-Allow-Origin' error

app.set('superSecret', config.secret);

module.exports = app;