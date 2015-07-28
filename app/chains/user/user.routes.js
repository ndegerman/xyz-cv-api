'use strict';

/**
 * Module dependencies.
 */
var userController = require('./user.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');

module.exports = function(routes) {

    // get users
    routes.get('/', function(request, response) {
        userController.getAllUsers()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    //get current user
    routes.get('/current', function(request, response) {
        userController.getUserByEmail(request.headers['x-forwarded-email'])
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    //get user by id
    routes.get('/:id', function(request, response) {
        userController.getUserById(request.params.id)
            .then(responseHandler.trimByAttributes(request.headers['x-forwarded-email'], ['canViewProfile', 'canEditProfile'], response))
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // delete a user given an id
    routes.delete('/:id', authentication.isAllowedOrSelf('canEditProfile'), function(request, response) {
        userController.deleteUserById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // update a user given an id and an object
    routes.put('/:id', authentication.isAllowedOrSelf('canEditProfile'), function(request, response) {
        userController.updateUser(request.params.id, request.body, request.headers['x-forwarded-email'])
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    return routes;
};
