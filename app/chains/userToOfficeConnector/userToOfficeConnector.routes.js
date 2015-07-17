'use strict';

/**
 * Module dependencies.
 */
var userToOfficeConnectorController = require('./userToOfficeConnector.controller');
var responseHandler = require('../../utils/response.handler');

module.exports = function(routes) {

    // create an userToOfficeConnector
    routes.post('/', function(request, response) {
        userToOfficeConnectorController.createUserToOfficeConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all userToOfficeConnectors
    routes.get('/', function(request, response) {
        userToOfficeConnectorController.getAllUserToOfficeConnectors()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete the userToOfficeConnector with the given id
    routes.delete('/:id', function(request, response) {
        userToOfficeConnectorController.deleteUserToOfficeConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get userToOfficeConnectors for user
    routes.get('/user/:id', function(request, response) {
        userToOfficeConnectorController.getUserToOfficeConnectorsByUserId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get userToOfficeConnectors for office
    routes.get('/office/:id', function(request, response) {
        userToOfficeConnectorController.getUserToOfficeConnectorsByOfficeId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToOfficeConnectors containing the given user id
    routes.delete('/user/:id', function(request, response) {
        userToOfficeConnectorController.deleteUserToOfficeConnectorsByUserId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToOfficeConnectors containing the given office id
    routes.delete('/office/:id', function(request, response) {
        userToOfficeConnectorController.deleteUserToOfficeConnectorsByOfficeId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
