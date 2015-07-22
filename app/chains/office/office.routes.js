'use strict';

/**
 * Module dependencies.
 */
var officeController = require('./office.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');

module.exports = function(routes) {

    // create an office
    routes.post('/', authentication.isAllowed('canEditOffice'), function(request, response) {
        officeController.createNewOffice(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get offices
    routes.get('/', function(request, response) {
        officeController.getAllOffices()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get an office by the given id
    routes.get('/:id', function(request, response) {
        officeController.getOfficeById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete an office given an id
    routes.delete('/:id', authentication.isAllowed('canEditOffice'), function(request, response) {
        officeController.deleteOfficeById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
