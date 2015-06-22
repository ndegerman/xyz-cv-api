'use strict';

/**
 * Module dependencies.
 */
var userSkillConnectorController = require('../controllers/userSkillConnector.controller');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    // create an userSkillConnector
    routes.post('/', function(request, response) {
        userSkillConnectorController.createUserSkillConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all userSkillConnectors
    routes.get('/', function(request, response) {
        userSkillConnectorController.getAllUserSkillConnectors()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete the userSkillConnector with the given id
    routes.delete('/:id', function(request, response) {
        userSkillConnectorController.deleteUserSkillConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get userSkillConnectors for user
    routes.get('/user/:id', function(request, response) {
        userSkillConnectorController.getUserSkillConnectorsByUserId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get userSkillConnectors for skill
    routes.get('/skill/:id', function(request, response) {
        userSkillConnectorController.getUserSkillConnectorsBySkillId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userSkillConnectors containing the given user id
    routes.delete('/user/:id', function(request, response) {
        userSkillConnectorController.deleteUserSkillConnectorsByUserId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userSkillConnectors containing the given skill id
    routes.delete('/skill/:id', function(request, response) {
        userSkillConnectorController.deleteUserSkillConnectorsBySkillId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
