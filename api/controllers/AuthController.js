/**
 * @author Nancy Victor 'github.com/navish' 
 * @description Authentication controller, contains register and login routes
*/


var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs'); // used for hashing passwords


var config = require('../config.js');
var User = require('../models/User');
var superSecret = config.secret;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

function handleError(res, errMsg) {
    return res.status(400).send(errMsg);
}

//Login
router.post("/login", function (req, res) {
    let user = req.body;
    User.findOne({ "email": user.email }, function (err, doc) {
        if (err || !doc || doc.length === 0) {
            handleError(res, "User not found");
        } else {
            //check if password is valid
            passIsValid = bcrypt.compareSync(user.password, doc.password);
            if (passIsValid) {
                // create a token with your own payload, don't pass in the entire user since that has the password
                const payload = {
                    userAppId: doc.email,
                    userId: doc._id
                };
                var token = jwt.sign(payload, superSecret, {
                    expiresIn: 60 * 60 // expires in 1 hour
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'logged in',
                    token: token,
                });

            }
            else {
                handleError(res, "Authentication failed");
            }



        }
    })
})

//Register
router.post("/register", function (req, res) {
    let newUser = req.body
    let hashPass = bcrypt.hashSync(newUser.password);
    User.create({
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        dob: newUser.dob,
        password: hashPass
    },
        function (err, doc) {
            if (err) {
                return res.status(500).send("There was a problem adding the information to the database.");
            }
            res.status(200).send(doc);
        });
});


module.exports = router;
