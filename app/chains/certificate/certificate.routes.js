'use strict';

/**
 * Module dependencies.
 */
var certificateController = require('./certificate.controller');
var responseHandler = require('../../utils/response.handler');
var authentication = require('../../middleware/authentication.middleware');
var config = require('config');

module.exports = function(routes) {

    // create an certificate
    routes.post('/', authentication.isAllowed('canViewCertificate'), function(request, response) {
        certificateController.createNewCertificate(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get certificates by query
    routes.get('/', authentication.isAllowed('canViewCertificate'), function(request, response) {
        certificateController.getCertificates(request.query)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get an certificate by the given id
    routes.get('/:id', authentication.isAllowed('canViewCertificate'), function(request, response) {
        certificateController.getCertificateById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // update an certificate given an id and an object
    routes.put('/:id', function(request, response) {
        certificateController.updateCertificate(request.params.id, request.body)
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    // delete an certificate given an id
    routes.delete('/:id', authentication.isAllowed('canEditCertificate'), function(request, response) {
        certificateController.deleteCertificateById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // create an indice
    routes.post('/_indice', authentication.hasAllowedEmail(config.SUPER_USERS), function(request, response) {
        certificateController.createIndex(request.body, request.query)
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
