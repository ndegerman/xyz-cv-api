'use strict';

/**
 * Module dependencies.
 */
var assignmentController = require('./assignment.controller');
var responseHandler = require('../../utils/response.handler');

module.exports = function(routes) {

    // create an assignment
    routes.post('/', function(request, response) {
        assignmentController.createNewAssignment(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get assignments
    routes.get('/', function(request, response) {
        assignmentController.getAllAssignments()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get an assignment by the given id
    routes.get('/:id', function(request, response) {
        assignmentController.getAssignmentById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete an assignment given an id
    routes.delete('/:id', function(request, response) {
        assignmentController.deleteAssignmentById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
