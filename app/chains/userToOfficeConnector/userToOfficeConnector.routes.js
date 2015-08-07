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

    // get all userToOfficeConnectors by query
    routes.get('/', function(request, response) {
        userToOfficeConnectorController.getUserToOfficeConnectors(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete the userToOfficeConnector with the given id
    routes.delete('/:id', function(request, response) {
        userToOfficeConnectorController.deleteUserToOfficeConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    //get userToOfficeConnector by id
    routes.get('/:id', function(request, response) {
        userToOfficeConnectorController.getUserToOfficeConnectorById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // update a userToOfficeConnector given an id and an object
    routes.put('/:id', function(request, response) {
        userToOfficeConnectorController.updateUserToOfficeConnector(request.params.id, request.body, request.headers['x-forwarded-email'])
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
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
