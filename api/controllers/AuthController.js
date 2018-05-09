//Authentication Contoller
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens


var config = require('../config.js');
var User = require('../models/User');
var superSecret = config.secret;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

function handleError(res, errMsg){
    return res.status(400).send(errMsg);
}

 //Login
 router.post("/login", function(req,res){
     let user = req.body;
     User.find({ $and : [{"email": user.email }, {"password": user.password }]}, function(err,doc){
        if (err || !doc || doc.length === 0) {
            handleError(res,"Failed to login");
        } else {
            // create a token with your own payload, don't pass in the entire user since that has the password
            const payload = {
                userAppId: user.username 
            };
            var token = jwt.sign(payload, superSecret, {
                expiresIn: 1440 // expires in 24 hours
            });
            
            // return the information including token as JSON
            res.json({
                success: true,
                message: 'logged in',
                token: token,
            });
            
        }
    })
 })

//Register
router.post("/api/user/register/", function(){
    let newUser = req.body.newUser
})


module.exports = router;
