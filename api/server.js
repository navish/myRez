
var app = require('./app.js');
var config = require('./config.js');

app.set('port', process.env.PORT || 8000);

// Initialize the app.
app.listen(app.get('port'), function () {
console.log("You just made the app listen to the db", app.get('port'));
});

