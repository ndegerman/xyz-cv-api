'use strict';

var path = require('path');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var attributeRoutes = require('./routes/attribute.routes')(express.Router());
var userRoutes = require('./routes/user.routes')(express.Router());
var roleRoutes = require('./routes/role.routes')(express.Router());
var accessRoutes = require('./routes/access.routes')(express.Router());

var errorMiddleware = require('./middleware/error.middleware');
var authenticationMiddleware = require('./middleware/authentication.middleware');

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

// ROUTES & MIDDLEWARE
// ============================================================================
app.use(authenticationMiddleware.authentication);

app.use('/api/attribute', attributeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/access', accessRoutes);

app.use(errorMiddleware.errorFilter);

// for debugging
app.get('/kalle', function(req, res) {
    console.log("ASD");

    res.send('Your email is: ' + req.headers['x-forwarded-email'] + ' and your accname: ' + req.headers['x-forwarded-user']);
});

var server = app.listen(port, function() {
    console.log('Server started: http://localhost:%s/', server.address().port);
});
