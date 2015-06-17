'use strict';

var q = require('q');

exports.getHttpError = function(statusCode) {
    return q.promise(function(resolve, reject) {
        var error = new Error();
        error.status = statusCode;
        switch(statusCode) {
            case 400:
                error.message = 'Invalid JSON object.';
                break;
            case 401:
                error.message = 'Unauthorized access.';
                break;
            case 404:
                error.message = 'No item with the given id was found.';
                break;
            case 406:
                error.message = 'Invalid response format.';
                break;
            case 500:
                error.message = 'The HTTP request could not be performed.';
                break;
            default:
                error.message = 'Unexpected status code: ' + statusCode;
                break;
        }
        return resolve(error);
    });
};
