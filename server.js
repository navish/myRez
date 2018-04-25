//server.js (aboutme/server.js)
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var session = require('express-session')

var mongodb = require('mongodb'),
mongoClient = mongodb.MongoClient,
ObjectID = mongodb.ObjectID, // Used in API endpoints
db; // We'll initialize connection below
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')

//var MONGODB_URI = process.env.MONGODB_URI;
var MONGODB_URI = 'mongodb://localhost/aboutme'

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized: true,
    store: new MongoStore({
        url: MONGODB_URI,
        ttl: 2 * 60 * 60,
        autoRemove: 'native'
    })
}))

// Initialize database connection and then start the server.
mongoClient.connect(MONGODB_URI, function (err, database) {
if (err) {
process.exit(1);
}

db = database.db("aboutme"); // Our database object from mLab

console.log("Database connection ready");

// Initialize the app.
app.listen(app.get('port'), function () {
console.log("You just made the app listen to the db", app.get('port'));
});


// About Me API Routes Will Go Below

//Get User by username
    app.post("/api/user/", function(req, res) {
        let user = req.body.username
        console.log("User API")
        console.log(user)
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
    app.post("/api/login/", function(req,res) {
        let user = req.body.credentials
        db.collection("users").find({ $and : [{"email": user.email }, {"password": user.password }] }).toArray(function(err,doc){
            if (err) {
                handleError(res, err.message, "Failed to login");
            } else {
                if(doc.length == 0)
                {
                    console.log("User not found");
                    var ses = {"ses":{
                        "allowed": false,
                        "error": err
                        }
                    }
                    res.status(200).json(ses);
                }
                else
                { 
                    req.session.userSession = user.email;
                    req.session.allowed = true;
                    var ses = {"ses":{
                        "userAppId":req.session.userSession,
                        "allowed": true
                        }
                    }
                    res.status(200).json(ses);
                }
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