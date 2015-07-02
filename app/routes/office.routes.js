'use strict';

/**
 * Module dependencies.
 */
var officeController = require('../controllers/office.controller');
var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    // create a office
    routes.post('/', function(request, response) {
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

    // get a office by the given id
    routes.get('/:id', function(request, response) {
        officeController.getOfficeById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete a office given an id
    routes.delete('/:id', function(request, response) {
        officeController.deleteOfficeById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
