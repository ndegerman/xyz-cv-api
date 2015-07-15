'use strict';

var multer = require('multer');
var fs = require('fs-extra');
var errorHandler = require('../utils/error.handler');
var q = require('q');
var config = require('config');
var lwip = require('lwip');

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

        var originalName = request.files[Object.getOwnPropertyNames(request.files)[0]].originalname;
        var generatedName = request.files[name].path;
        generatedName = generatedName.substring(8, generatedName.length);
        var file = getFileTemplate();
        file.originalName = originalName;
        file.generatedName = generatedName;
        return resolve(file);
    });
};

exports.deleteFile = function(file) {
    return q.promise(function(resolve, reject) {
        var path = config.UPLOAD_PATH + file.generatedName;
        var retinaPath = config.UPLOAD_PATH + getRetinaName(file.generatedName);

        fs.unlink(path, function() {
            fs.unlink(retinaPath, function() {
                resolve(file._id);
            });
        });
    });
};

function getFileTemplate() {
    return {
        generatedName: null,
        originalName: null
    };
}

function getRetinaName(name) {
    var newNameList = name.split('.');
    var newName = '';
    for (var i = 0; i < newNameList.length; i++) {
        if (i === newNameList.length - 1) {
            break;
        }
        newName += newNameList[i];
    }

    newName += '@2x.' + newNameList[newNameList.length - 1];
    return newName;
}

function getConfig() {
    return {
        dest: config.UPLOAD_PATH,
        limits: {
            files: 1,
            fileSize: 5 * 1024 * 1024
        },

        onFileUploadStart: function(file, request, response) {
            file.failed = false;
            var extensions = ['png', 'jpg'];
            var extension = file.extension.toLowerCase();
            if (extensions.indexOf(extension) <= -1) {
                return false;
            }

            if (request.method !== 'POST') {
                return false;
            }
        },

        onFileUploadComplete: function(file, request, response) {
            var newName = getRetinaName(file.name);

            fs.copy(file.path, config.UPLOAD_PATH + newName, function(error) {
                if (error) {
                    file.failed = true;
                    throw error;
                }
            });

            lwip.open(file.path, function(error, image) {
                if (error) {
                    file.failed = true;
                }

                image.scale(0.5, function(error, image) {
                    if (error) {
                        file.failed = true;
                    }

                    image.toBuffer(file.extension.toLowerCase(), function(error, buffer) {
                        if (error) {
                            file.failed = true;
                        }

                        fs.writeFileSync(file.path, buffer);
                    });
                });
            });

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
