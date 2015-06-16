'use strict';

/**
 * Module dependencies.
 */
var userController = require('../controllers/user.controller');
var q = require('q');
var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    // get users
    routes.get('/', function(request, response) {
        userController.getAllUsers()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
