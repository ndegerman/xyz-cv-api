'use strict';

/**
 * Module dependencies.
 */
var userToSkillConnectorController = require('./userToSkillConnector.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');

module.exports = function(routes) {

    // create an userToSkillConnector
    routes.post('/', authentication.isAllowedOrSelf('canEditUser', 'body', 'userId'), function(request, response) {
        userToSkillConnectorController.createUserToSkillConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all userToSkillConnectors by query
    routes.get('/', authentication.isAllowed('canViewUser'), function(request, response) {
        userToSkillConnectorController.getUserToSkillConnectors(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    //get userToSkillConnector by id
    routes.get('/:id', authentication.isAllowed('canViewUser'), function(request, response) {
        userToSkillConnectorController.getUserToSkillConnectorById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // update a userToSkillConnector given an id and an object
    routes.put('/:id', authentication.isAllowedOrOwnConnector('canEditUser', userToSkillConnectorController.getUserToSkillConnectorById), function(request, response) {
        userToSkillConnectorController.updateUserToSkillConnector(request.params.id, request.body, request.headers['x-forwarded-email'])
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // delete the userToSkillConnector with the given id
    routes.delete('/:id', authentication.isAllowedOrOwnConnector('canEditUser', userToSkillConnectorController.getUserToSkillConnectorById), function(request, response) {
        userToSkillConnectorController.deleteUserToSkillConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToSkillConnectors containing the given user id
    routes.delete('/user/:id', authentication.isAllowedOrSelf('canEditUser', 'params', 'id'), function(request, response) {
        userToSkillConnectorController.deleteUserToSkillConnectorsByUserId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToSkillConnectors containing the given skill id
    routes.delete('/skill/:id', authentication.isAllowed('canEditUser'), function(request, response) {
        userToSkillConnectorController.deleteUserToSkillConnectorsBySkillId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
