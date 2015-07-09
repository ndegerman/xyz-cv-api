'use strict';

/**
 * Module dependencies.
 */

var responseHandler = require('../utils/response.handler');
var uploadHandler = require('../utils/upload.handler');

module.exports = function(routes) {

    //post a file
    routes.post('/', function(request, response) {
        uploadHandler.checkIfSuccess(request, response)
            .then(responseHandler.sendSuccessUploadJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));

    });

    return routes;
};
