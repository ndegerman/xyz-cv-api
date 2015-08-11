'use strict';

/**
 * Module dependencies.
 */
var userToOfficeConnectorController = require('./userToOfficeConnector.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');

module.exports = function(routes) {

    // create an userToOfficeConnector
    routes.post('/', authentication.isAllowedOrSelf('canEditUser', 'body', 'userId'), function(request, response) {
        userToOfficeConnectorController.createUserToOfficeConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all userToOfficeConnectors by query
    routes.get('/', authentication.isAllowed('canViewUser'), function(request, response) {
        userToOfficeConnectorController.getUserToOfficeConnectors(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    //get userToOfficeConnector by id
    routes.get('/:id', authentication.isAllowed('canViewUser'), function(request, response) {
        userToOfficeConnectorController.getUserToOfficeConnectorById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // update a userToOfficeConnector given an id and an object
    routes.put('/:id', authentication.isAllowedOrOwnConnector('canEditUser', userToOfficeConnectorController.getUserToOfficeConnectorById), function(request, response) {
        userToOfficeConnectorController.updateUserToOfficeConnector(request.params.id, request.body, request.headers['x-forwarded-email'])
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // delete the userToOfficeConnector with the given id
    routes.delete('/:id', authentication.isAllowedOrOwnConnector('canEditUser', userToOfficeConnectorController.getUserToOfficeConnectorById), function(request, response) {
        userToOfficeConnectorController.deleteUserToOfficeConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToOfficeConnectors containing the given user id
    routes.delete('/user/:id', authentication.isAllowedOrSelf('canEditUser', 'params', 'id'), function(request, response) {
        userToOfficeConnectorController.deleteUserToOfficeConnectorsByUserId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToOfficeConnectors containing the given office id
    routes.delete('/office/:id', authentication.isAllowed('canEditUser'), function(request, response) {
        userToOfficeConnectorController.deleteUserToOfficeConnectorsByOfficeId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
