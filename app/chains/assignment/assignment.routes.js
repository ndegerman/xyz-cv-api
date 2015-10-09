'use strict';

/**
 * Module dependencies.
 */
var assignmentController = require('./assignment.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');
var config = require('config');

module.exports = function(routes) {

    // create an assignment
    routes.post('/', authentication.isAllowed('canViewAssignment'), function(request, response) {
        assignmentController.createNewAssignment(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get assignments by query
    routes.get('/', authentication.isAllowed('canViewAssignment'), function(request, response) {
        assignmentController.getAssignments(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get an assignment by the given id
    routes.get('/:id', authentication.isAllowed('canViewAssignment'), function(request, response) {
        assignmentController.getAssignmentById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete an assignment given an id
    routes.delete('/:id', authentication.isAllowed('canEditAssignment'), function(request, response) {
        assignmentController.deleteAssignmentById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // create an indice
    routes.post('/_indice', authentication.hasAllowedEmail(config.SUPER_USERS), function(request, response) {
        assignemntController.createIndex(request.body, request.query)
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
