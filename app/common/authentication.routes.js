'use strict';

/**
 * Module dependencies.
 */

var responseHandler = require('../utils/response.handler');
var authenticationHandler = require('../utils/authentication.handler');

module.exports = function(routes) {

    routes.get('/', function(request, response) {
        authenticationHandler.getUserAttributes(request.headers['x-forwarded-email'])
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
