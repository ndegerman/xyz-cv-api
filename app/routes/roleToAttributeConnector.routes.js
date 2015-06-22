'use strict';

/**
 * Module dependencies.
 */
var roleToAttributeConnectorController = require('../controllers/roleToAttributeConnector.controller');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    // create a roleToAttributeConnector
    routes.post('/', function(request, response) {
        roleToAttributeConnectorController.createRoleToAttributeConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all roleToAttributeConnectors
    routes.get('/', function(request, response) {
        roleToAttributeConnectorController.getAllRoleToAttributeConnectors()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete the roleToAttributeConnector with the given id
    routes.delete('/:id', function(request, response) {
        roleToAttributeConnectorController.deleteRoleToAttributeConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get roleToAttributeConnectors for role
    routes.get('/role/:id', function(request, response) {
        roleToAttributeConnectorController.getRoleToAttributeConnectorsByRoleId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get roleToAttributeConnectors for attribute
    routes.get('/attribute/:id', function(request, response) {
        roleToAttributeConnectorController.getRoleToAttributeConnectorsByAttributeId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete roleToAttributeConnectors containing the given role id
    routes.delete('/role/:id', function(request, response) {
        roleToAttributeConnectorController.deleteRoleToAttributeConnectorsByRoleId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete roleToAttributeConnectors containing the given attribute id
    routes.delete('/attribute/:id', function(request, response) {
        roleToAttributeConnectorController.deleteRoleToAttributeConnectorsByAttributeId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
