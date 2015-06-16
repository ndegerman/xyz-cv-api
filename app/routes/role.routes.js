'use strict';

/**
 * Module dependencies.
 */
var roleController = require('../controllers/role.controller');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    // create a role
    routes.post('/', function(request, response) {
        roleController.createNewRole(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get roles
    routes.get('/', function(request, response) {
        roleController.getAllRoles()
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
    routes.delete('/:id', function(request, response) {
        roleController.deleteRoleById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};