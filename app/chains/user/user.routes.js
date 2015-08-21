'use strict';

/**
 * Module dependencies.
 */
var userController = require('./user.controller');
var responseHandler = require('../../utils/response.handler');
var authenticationHandler = require('../../utils/authentication.handler');
var authentication = require('../../middleware/authentication.middleware');
var utils = require('../../utils/utils');
var config = require('config');

module.exports = function(routes) {

    // get users
    routes.get('/', authentication.isAllowed('canViewUser'), function(request, response) {
        userController.getUsers(request.query)
            .then(authenticationHandler.filterHiddenEntities(request.headers['x-forwarded-email'], ['canEditUser']))
            .then(authenticationHandler.trimManyByattributes(request.headers['x-forwarded-email'], ['canViewUser', 'canEditUser']))
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    //get current user
    routes.get('/current', function(request, response) {
        userController.getUsers({email: request.headers['x-forwarded-email']})
            .then(utils.returnFirstIndex)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    //get user by id
    routes.get('/:id', authentication.isAllowed('canViewUser'), function(request, response) {
        userController.getUserById(request.params.id)
            .then(authenticationHandler.blockHidden(request.headers['x-forwarded-email'], ['canEditUser']))
            .then(authenticationHandler.trimByAttributes(request.headers['x-forwarded-email'], ['canViewUser', 'canEditUser']))
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // update a user given an id and an object
    routes.put('/:id', authentication.isAllowedOrSelf('canEditUser', 'params', 'id'), authentication.checkForForbiddenFields(['hidden', 'email', 'role'], ['canEditUser']), function(request, response) {
        userController.updateUser(request.params.id, request.body, request.headers['x-forwarded-email'])
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // delete a user given an id
    routes.delete('/:id', authentication.isAllowedOrSelf('canEditUser', 'params', 'id'), function(request, response) {
        userController.deleteUserById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // create an indice
    routes.post('/_indice', authentication.hasAllowedEmail(config.SUPER_USERS), function(request, response) {
        userController.createIndex(request.body, request.query)
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete all indices for users
    routes.delete('/:id', authentication.hasAllowedEmail(config.SUPER_USERS), function(request, response) {
        userController.purgeIndices()
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
