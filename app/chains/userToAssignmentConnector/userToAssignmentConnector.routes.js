'use strict';

/**
 * Module dependencies.
 */
var userToAssignmentConnectorController = require('./userToAssignmentConnector.controller');
var responseHandler = require('../../utils/response.handler');

module.exports = function(routes) {

    // create an userToAssignmentConnector
    routes.post('/', function(request, response) {
        userToAssignmentConnectorController.createUserToAssignmentConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all userToAssignmentConnectors
    routes.get('/', function(request, response) {
        userToAssignmentConnectorController.getAllUserToAssignmentConnectors()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    //get userToAssignmentConnector by id
    routes.get('/:id', function(request, response) {
        userToAssignmentConnectorController.getUserToAssignmentConnectorById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // delete the userToAssignmentConnector with the given id
    routes.delete('/:id', function(request, response) {
        userToAssignmentConnectorController.deleteUserToAssignmentConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get userToAssignmentConnectors for user
    routes.get('/user/:id', function(request, response) {
        userToAssignmentConnectorController.getUserToAssignmentConnectorsByUserId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get userToAssignmentConnectors for assignment
    routes.get('/assignment/:id', function(request, response) {
        userToAssignmentConnectorController.getUserToAssignmentConnectorsByAssignmentId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // update a userToAssignmentConnector given an id and an object
    routes.put('/:id', function(request, response) {
        userToAssignmentConnectorController.updateUserToAssignmentConnector(request.params.id, request.body, request.headers['x-forwarded-email'])
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // delete userToAssignmentConnectors containing the given user id
    routes.delete('/user/:id', function(request, response) {
        userToAssignmentConnectorController.deleteUserToAssignmentConnectorsByUserId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToAssignmentConnectors containing the given assignment id
    routes.delete('/assignment/:id', function(request, response) {
        userToAssignmentConnectorController.deleteUserToAssignmentConnectorsByAssignmentId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
