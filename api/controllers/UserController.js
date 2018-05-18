/**
 * @author Nancy Victor 'github.com/navish' 
 * @description Controller for users, containes all user related logic
*/


var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/User');
var verifyToken = require('../checktoken')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function handleError(res, errMsg) {
    return res.status(400).send(errMsg);
}
//Get User by email
router.post("/", verifyToken, function (req, res) {
    let user = req.body;
    User.find({ "email": user.email }, '_id fname lname email', function (err, doc) {
        if (err) {
            handleError(res, "Failed to get user")
        } else {
            res.status(200).send(doc);
        }
    });
});

//Get all users
router.get("/", verifyToken, function (req, res) {
    User.find({}, '_id fname lname email', function (err, doc) {
        if (err) {
            handleError(res, "Failed to get users");
        } else {
            res.status(200).json(doc);
        }
    });
});

module.exports = router;