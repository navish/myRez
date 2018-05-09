//server.js (aboutme/server.js)
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var session = require('express-session');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./dbconfig.js'); // get ur config file
var mongodb = require('mongodb');

mongoClient = mongodb.MongoClient,
ObjectID = mongodb.ObjectID; // Used in API endpoints

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8000);
app.use(cors()); 
app.use(express.static("www"));

var MONGODB_URI = config.database;
app.set('superSecret', config.secret); // secret variable



// Initialize database connection and then start the server.
mongoClient.connect(MONGODB_URI, function (err, database) {
if (err) {
process.exit(1);
}

db = database.db("aboutme"); // Our database object from mLab

// Initialize the app.
app.listen(app.get('port'), function () {
console.log("You just made the app listen to the db", app.get('port'));
});

function handleError(res, errMsg){
    return res.status(400).send(errMsg);
}

// API ROUTES //

    //Login
    app.post("/api/sessions/create", function(req,res) {
        let user = req.body;
        db.collection("users").find({ $and : [{"email": user.username }, {"password": user.password }] }).toArray(function(err,doc){
            if (err || !doc || doc.length === 0) {
                handleError(res,"Failed to login");
            } else {
                // create a token with your own payload, don't pass in the entire user since that has the password
                const payload = {
                    userAppId: user.username 
                };
                var token = jwt.sign(payload, app.get('superSecret'), {
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
    app.post("/api/user/register/", function(){
        let newUser = req.body.newUser
    })
    //Get User by username
    app.post("/api/user/", function(req, res) {
        let user = req.body.username;
        db.collection("users").find({"email": user.email}).toArray(function(err, doc) {
            if (err) {
                handleError(res, "Failed to get the user by username");
            } else {
                res.status(200).json(doc)
            }
        });
    });
    //Get all users
    app.get("/api/users/", function(req, res) {
        db.collection("users").find({}).toArray(function(err, doc) {
            if (err) {
            handleError(res, "Failed to get users");
            } else {
            res.status(200).json(doc);
            }
        });
    });


    //Get all resolution lists
    app.get("/api/resolution_lists/", function(req, res) {
        db.collection("resLists").find({}).toArray(function(err, doc) {
            if (err) {
            handleError(res, "Failed to get Lists");
            } else {
            res.json(doc);
            }
        });
    });
});