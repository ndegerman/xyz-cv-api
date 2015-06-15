'use strict';

/**
 * Module dependencies.
 */
var userController = require('../controllers/user.controller');
var q = require('q');

module.exports = function(routes) {

    // get users
    routes.get('/', function(request, response) {
        userController.getAllUsers()
            .then(function(users) {
                return response.json(users);
            })
            .catch(function(error) {
                return response.status(error.status || 500).send(error.message);
            });
    });
    return routes;
};
