var path = require('path');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var authRoutes = require('./routes/authentication.routes')(express.Router());
var attrRoutes = require('./routes/attribute.routes')(express.Router());
var userRoutes = require('./routes/user.routes')(express.Router());

var config = require('./config/config');

var app = express();


// CONFIG
// ============================================================================
var port = process.env.PORT || 9000;
app.set('superSecret', config.secret);

// json
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// logging
app.use(morgan('dev'));

// ROUTES
// ============================================================================
app.use('/api/', authRoutes);
app.use('/api/attr', attrRoutes);
app.use('/api/user', userRoutes);

// for debugging
app.get('/kalle', function(req, res) {
    console.log("ASD");

    res.send('Your email is: ' + req.headers['x-forwarded-email'] + ' and your accname: ' + req.headers['x-forwarded-user']);
});

var server = app.listen(port, function() {
    console.log('Server started: http://localhost:%s/', server.address().port);
});