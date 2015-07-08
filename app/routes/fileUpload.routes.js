'use strict';

/**
 * Module dependencies.
 */

var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    //post an image
    routes.post('/', function(request, response) {
        response.status(204)
            .end();
    });

    return routes;
};
