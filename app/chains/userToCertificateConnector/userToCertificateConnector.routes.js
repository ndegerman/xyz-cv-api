'use strict';

/**
 * Module dependencies.
 */
var userToCertificateConnectorController = require('./userToCertificateConnector.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');

module.exports = function(routes) {

    // create an userToCertificateConnector
    routes.post('/', authentication.isAllowedOrSelf('canEditUser', 'body', 'userId'), function(request, response) {
        userToCertificateConnectorController.createUserToCertificateConnector(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all userToCertificateConnectors by query
    routes.get('/', authentication.isAllowed('canViewUser'), function(request, response) {
        userToCertificateConnectorController.getUserToCertificateConnectors(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    //get userToCertificateConnector by id
    routes.get('/:id', authentication.isAllowed('canViewUser'), function(request, response) {
        userToCertificateConnectorController.getUserToCertificateConnectorById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // update a userToCertificateConnector given an id and an object
    routes.put('/:id', authentication.isAllowedOrOwnConnector('canEditUser', userToCertificateConnectorController.getUserToCertificateConnectorById), function(request, response) {
        userToCertificateConnectorController.updateUserToCertificateConnector(request.params.id, request.body, request.headers['x-forwarded-email'])
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // delete the userToCertificateConnector with the given id
    routes.delete('/:id', authentication.isAllowedOrOwnConnector('canEditUser', userToCertificateConnectorController.getUserToCertificateConnectorById), function(request, response) {
        userToCertificateConnectorController.deleteUserToCertificateConnectorById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToCertificateConnectors containing the given user id
    routes.delete('/user/:id', authentication.isAllowedOrSelf('canEditUser', 'params', 'id'), function(request, response) {
        userToCertificateConnectorController.deleteUserToCertificateConnectorsByUserId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete userToCertificateConnectors containing the given certificate id
    routes.delete('/certificate/:id', authentication.isAllowed('canEditUser'), function(request, response) {
        userToCertificateConnectorController.deleteUserToCertificateConnectorsByCertificateId(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
