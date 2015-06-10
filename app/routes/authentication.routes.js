'use strict';

/**
 * Module dependencies.
 */
var userController = require('../controllers/user.controller');
var config = require('../config/config');
var q = require('q');

module.exports = function(routes) {

    // middleware
    routes.use(function(request, response, next) {   
        var email = request.headers['x-forwarded-email']
        var name = request.headers['x-forwarded-user']
        if (!email) {
            return response.status(401).json({ message: 'You need to login first!' });
        }

        userController.getUserByEmail(email)
            .then(function(user) {
                if (!user) {
                    var user = userController.getUserTemplate();
                    user.name = name;
                    user.email = email;
                    userController.createNewUser(user)
                        .then(function() {
                            next();
                        });
                } else {
                    next();
                }
            })
            .catch(function(error) {
                response.send(error);
            });
    });
    return routes;
};