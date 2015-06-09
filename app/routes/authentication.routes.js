'use strict';

/**
 * Module dependencies.
 */
var userController = require('../controllers/user.controller');
var config = require('../config/config');
var q = require('q');

module.exports = function(routes) {

  // middleware
    routes.use(function(req, res, next) {   
        var email = req.headers['x-forwarded-email']
        var name = req.headers['x-forwarded-user']
        if (!email) {
            return res.status(401).json({ message: 'You need to login first!' });
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
        .catch(function(err) {
            res.send(err);
        });
    });

    return routes;
};
