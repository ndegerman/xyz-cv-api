'use strict';

/**
 * Module dependencies.
 */
var userController = require('../controllers/user.controller');
var config = require('../config/config');
var q = require('q');

// middleware
exports.authentication = function(request, response, next) {   
    var email = request.headers['x-forwarded-email']
    var name = request.headers['x-forwarded-user']
    if (!email) {
        return response.status(401).json({ message: 'You need to login first!' });
    }

    userController.getUserByEmail(email)
        .then(function(user) {
            if (!user) {
                userController.createNewUser(name, email)
                    .then(next);
            } else {
                next();
            }
        })
        .catch(response.send);
};