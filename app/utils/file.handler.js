'use strict';

var multer = require('multer');
var fs = require('fs');
var errorHandler = require('../utils/error.handler');
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

        return resolve(request.files[name].path);
    });
};

exports.deleteFile = function(file) {
    return q.promise(function(resolve, reject) {
        var path = './uploads/' + file.generatedName;
        fs.unlink(path, function(error) {
            if (error) {
                resolve(file._id);
            }

            resolve(file._id);
        });
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
            var extensions = ['png', 'jpg', 'jpeg'];
            var extension = file.extension.toLowerCase();
            if (extensions.indexOf(extension) <= -1) {
                return false;
            }

            if (request.method !== 'POST') {
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
