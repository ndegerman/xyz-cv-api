'use strict';

/**
 * Module dependencies.
 */
var customerController = require('./customer.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');

module.exports = function(routes) {

    // create a customer
    routes.post('/', authentication.isAllowed('canEditCustomer'), function(request, response) {
        customerController.createNewCustomer(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get customer by query
    routes.get('/', function(request, response) {
        customerController.getCustomers(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get a customer by the given id
    routes.get('/:id', function(request, response) {
        customerController.getCustomerById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete a customer given an id
    routes.delete('/:id', authentication.isAllowed('canEditCustomer'), function(request, response) {
        customerController.deleteCustomerById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
