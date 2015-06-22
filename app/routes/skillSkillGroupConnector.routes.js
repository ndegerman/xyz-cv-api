'use strict';

/**
 * Module dependencies.
 */
var skillSkillGroupConnectorController = require('../controllers/skillSkillGroupConnector.controller');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    // create a skillSkillGroupConnector
    routes.post('/', function(request, response) {
        skillSkillGroupConnectorController.createSkillSkillGroupConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all skillSkillGroupConnectors
    routes.get('/', function(request, response) {
        skillSkillGroupConnectorController.getAllSkillSkillGroupConnectors()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete the skillSkillGroupConnector with the given id
    routes.delete('/:id', function(request, response) {
        skillSkillGroupConnectorController.deleteSkillSkillGroupConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get skillSkillGroupConnectors for skillGroup
    routes.get('/skillGroup/:id', function(request, response) {
        skillSkillGroupConnectorController.getSkillSkillGroupConnectorsBySkillGroupId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get skillSkillGroupConnectors for skill
    routes.get('/skill/:id', function(request, response) {
        skillSkillGroupConnectorController.getSkillSkillGroupConnectorsBySkillId(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete skillSkillGroupConnectors containing the given skillGroup id
    routes.delete('/skillGroup/:id', function(request, response) {
        skillSkillGroupConnectorController.deleteSkillSkillGroupConnectorsBySkillGroupId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete skillSkillGroupConnectors containing the given skill id
    routes.delete('/skill/:id', function(request, response) {
        skillSkillGroupConnectorController.deleteSkillSkillGroupConnectorsBySkillId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
