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

    //get user by id
    routes.get('/:id', function(request, response) {
        userController.getUserById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // delete a user given an id
    routes.delete('/:id', function(request, response) {
        userController.deleteUserById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // change field for a user given an id
    routes.put('/:id', function(request, response) {
        userController.changeFieldForUser(request)
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    return routes;
};
