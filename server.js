//server.js (aboutme/server.js)
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var session = require('express-session');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./dbconfig.js'); // get our config file
var mongodb = require('mongodb');

mongoClient = mongodb.MongoClient,
ObjectID = mongodb.ObjectID; // Used in API endpoints
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')

//var MONGODB_URI = process.env.MONGODB_URI;
var MONGODB_URI = 'mongodb://localhost/aboutme'
app.set('superSecret', config.secret); // secret variable

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized: true,
    store: new MongoStore({
        url: MONGODB_URI,
        ttl: 1 * 1 * 60,
        autoRemove: 'native'
    })
}))

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


// About Me API Routes Will Go Below

//Get User by username
    app.post("/api/user/", function(req, res) {
        let user = req.body.username
        console.log("User API")
        db.collection("users").find({"email": user}).toArray(function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to get the user by username");
            } else {
                console.log(doc)
                res.status(200).json(doc)
                //res.send(req.session.doc)
            }
        });
    });


//Login
app.post("/api/sessions/create", function(req,res) {
    let user = req.body;
    db.collection("users").find({ $and : [{"email": user.username }, {"password": user.password }] }).toArray(function(err,doc){
        if (err) {
            handleError(res, err.message, "Failed to login");
        } else {
            // create a token with only our given payload
            // we don't want to pass in the entire user since that has the password
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
            
                //res.status(200).json(doc);
        }
    })
})
//Get all users
    app.get("/api/users/", function(req, res) {
        db.collection("users").find({}).toArray(function(err, doc) {
            if (err) {
            handleError(res, err.message, "Failed to get users");
            } else {
            res.status(200).json(doc);
            }
        });
    });
});