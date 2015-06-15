'use strict';

/**
 * Module dependencies.
 */
var attributeController = require('../controllers/attribute.controller');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    // create an attribute
    routes.post('/', function(request, response) {
        attributeController.createNewAttribute(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get attributes
    routes.get('/', function(request, response) {
        attributeController.getAllAttributes()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });
    return routes;
};
