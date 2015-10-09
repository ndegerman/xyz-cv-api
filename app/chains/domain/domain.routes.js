'use strict';

/**
 * Module dependencies.
 */
var domainController = require('./domain.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');

module.exports = function(routes) {

    // create a domain
    routes.post('/', authentication.isAllowed('canEditDomain'), function(request, response) {
        domainController.createNewDomain(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get domain by query
    routes.get('/', function(request, response) {
        domainController.getDomains(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get a domain by the given id
    routes.get('/:id', function(request, response) {
        domainController.getDomainById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete a domain given an id
    routes.delete('/:id', authentication.isAllowed('canEditDomain'), function(request, response) {
        domainController.deleteDomainById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
