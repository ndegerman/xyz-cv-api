'use strict';

/**
 * Module dependencies.
 */
var roleAttributeConnectorController = require('../controllers/roleAttributeConnector.controller');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    // create a roleAttributeConnector
    routes.post('/', function(request, response) {
        roleAttributeConnectorController.createRoleAttributeConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all roleAttributeConnectors
    routes.get('/', function(request, response) {
        roleAttributeConnectorController.getAllRoleAttributeConnectors()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete the roleAttributeConnector with the given id
    routes.delete('/:id', function(request, response) {
        roleAttributeConnectorController.deleteRoleAttributeConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get roleAttributeConnectors for role
    routes.get('/role/:id', function(request, response) {
        roleAttributeConnectorController.getRoleAttributeConnectorsByRoleId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get roleAttributeConnectors for attribute
    routes.get('/attribute/:id', function(request, response) {
        roleAttributeConnectorController.getRoleAttributeConnectorsByAttributeId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete roleAttributeConnectors containing the given role id
    routes.delete('/role/:id', function(request, response) {
        roleAttributeConnectorController.deleteRoleAttributeConnectorsByRoleId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete roleAttributeConnectors containing the given attribute id
    routes.delete('/attribute/:id', function(request, response) {
        roleAttributeConnectorController.deleteRoleAttributeConnectorsByAttributeId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
