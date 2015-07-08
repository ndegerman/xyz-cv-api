'use strict';

var multer = require('multer');
var fs = require('fs');
var errorHandler = require('../utils/error.handler');
var responseHandler = require('../utils/response.handler');
var q = require('q');

exports.getHandler = function() {
    return multer(getConfig());
};

exports.checkIfSuccess = function(request, response) {
    return q.promise(function(resolve, reject) {
        if (!Object.keys(request.files).length) {
            return errorHandler.getHttpError(415)
                .then(reject);
        }

        var name = Object.getOwnPropertyNames(request.files)[0];
        if (request.files[name].failed) {
            return errorHandler.getHttpError(413)
                .then(reject);
        }

        return resolve();
    });
};

function getConfig() {
    return {
        dest: './uploads/',
        limits: {
            files: 1,
            fileSize: 5 * 1024 * 1024
        },

        onFileUploadStart: function(file, request, response) {
            file.failed = false;
            if (file.extension !== 'PNG') {
                return false;
            }
        },

        onError: function(error, next) {
            console.log(error);
            next(error);
        },

        onFileSizeLimit: function(file) {
            fs.unlink('./' + file.path);
            file.failed = true;
        }
    };
}
