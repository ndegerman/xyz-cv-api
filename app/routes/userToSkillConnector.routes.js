'use strict';

/**
 * Module dependencies.
 */
var userToSkillConnectorController = require('../controllers/userToSkillConnector.controller');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    // create an userToSkillConnector
    routes.post('/', function(request, response) {
        userToSkillConnectorController.createUserToSkillConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all userToSkillConnectors
    routes.get('/', function(request, response) {
        userToSkillConnectorController.getAllUserToSkillConnectors()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete the userToSkillConnector with the given id
    routes.delete('/:id', function(request, response) {
        userToSkillConnectorController.deleteUserToSkillConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get userToSkillConnectors for user
    routes.get('/user/:id', function(request, response) {
        userToSkillConnectorController.getUserToSkillConnectorsByUserId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get userToSkillConnectors for skill
    routes.get('/skill/:id', function(request, response) {
        userToSkillConnectorController.getUserToSkillConnectorsBySkillId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToSkillConnectors containing the given user id
    routes.delete('/user/:id', function(request, response) {
        userToSkillConnectorController.deleteUserToSkillConnectorsByUserId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToSkillConnectors containing the given skill id
    routes.delete('/skill/:id', function(request, response) {
        userToSkillConnectorController.deleteUserToSkillConnectorsBySkillId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
