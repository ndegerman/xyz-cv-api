'use strict';

/**
 * Module dependencies.
 */
var userController = require('../controllers/user.controller');
var q = require('q');

module.exports = function(routes) {

    // get users
    routes.get('/', function(req, res) {
        userController.getAllUsers()
        .then(function(users) {
            return res.json(users);
        }).catch(function(error) {
            return res.send(error);
        });
    });

    return routes;
};
