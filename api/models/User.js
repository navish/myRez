// User.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  fname: {
    type: String,
    required: true
  },

  lname: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    unique: true,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  signupDate: {
    type: Date, 
    default: Date.now
  },   
  password: {
    type: String,
    required: true
  }

});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');