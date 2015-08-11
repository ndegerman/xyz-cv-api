'use strict';

/**
 * Module dependencies.
 */
var roleController = require('./role.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');

module.exports = function(routes) {

    // create a role
    routes.post('/', authentication.isAllowed('canEditRole'), function(request, response) {
        roleController.createNewRole(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get roles by query
    routes.get('/', function(request, response) {
        roleController.getRoles(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get a role by the given id
    routes.get('/:id', function(request, response) {
        roleController.getRoleById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete a role given an id
    routes.delete('/:id', authentication.isAllowed('canEditRole'), function(request, response) {
        roleController.deleteRoleById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
