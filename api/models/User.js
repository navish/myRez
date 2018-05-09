// User.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  fname: String,
  lname: String,
  email: String,
  dob: Date,
  signupDate: {type: Date, default: Date.now},   
  password: String

});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');