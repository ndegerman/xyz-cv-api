'use strict';

/**
 * Module dependencies.
 */
var userToAssignmentConnectorController = require('./userToAssignmentConnector.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');

module.exports = function(routes) {

    // create an userToAssignmentConnector
    routes.post('/', authentication.isAllowedOrSelf('canEditUser', 'body', 'userId'), function(request, response) {
        userToAssignmentConnectorController.createUserToAssignmentConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all userToAssignmentConnectors by query
    routes.get('/', authentication.isAllowed('canViewUser'), function(request, response) {
        userToAssignmentConnectorController.getUserToAssignmentConnectors(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    //get userToAssignmentConnector by id
    routes.get('/:id', authentication.isAllowed('canViewUser'), function(request, response) {
        userToAssignmentConnectorController.getUserToAssignmentConnectorById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // update a userToAssignmentConnector given an id and an object
    routes.put('/:id', authentication.isAllowedOrOwnConnector('canEditUser', userToAssignmentConnectorController.getUserToAssignmentConnectorById), function(request, response) {
        userToAssignmentConnectorController.updateUserToAssignmentConnector(request.params.id, request.body, request.headers['x-forwarded-email'])
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // delete the userToAssignmentConnector with the given id
    routes.delete('/:id', authentication.isAllowedOrOwnConnector('canEditUser', userToAssignmentConnectorController.getUserToAssignmentConnectorById), function(request, response) {
        userToAssignmentConnectorController.deleteUserToAssignmentConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToAssignmentConnectors containing the given user id
    routes.delete('/user/:id', authentication.isAllowedOrSelf('canEditUser', 'params', 'id'), function(request, response) {
        userToAssignmentConnectorController.deleteUserToAssignmentConnectorsByUserId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToAssignmentConnectors containing the given assignment id
    routes.delete('/assignment/:id', authentication.isAllowed('canEditUser'), function(request, response) {
        userToAssignmentConnectorController.deleteUserToAssignmentConnectorsByAssignmentId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
