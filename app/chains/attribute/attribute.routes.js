'use strict';

/**
 * Module dependencies.
 */
var attributeController = require('./attribute.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');

module.exports = function(routes) {

    // create an attribute
    routes.post('/', authentication.isAllowed('canEditAttribute'), function(request, response) {
        attributeController.createNewAttribute(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get attributes by query
    routes.get('/', function(request, response) {
        attributeController.getAttributes(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get an attribute by the given id
    routes.get('/:id', function(request, response) {
        attributeController.getAttributeById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete an attribute given an id
    routes.delete('/:id', authentication.isAllowed('canEditAttribute'), function(request, response) {
        attributeController.deleteAttributeById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
