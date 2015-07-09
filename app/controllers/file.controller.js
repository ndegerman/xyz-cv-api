'use strict';

var fileDao = require('../dao/file.dao');
var q = require('q');
var errorHandler = require('../utils/error.handler');

function validateFile(file) {
    return q.promise(function(resolve, reject) {
        if (file && file.generatedName && file.originalName) {
            return resolve(file);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

exports.createNewFile = function(file) {
        fileDao.createNewFile(file);
};

// exports.getFileByGeneratedName = function(name) {
//     return fileDao.getFileByGeneratedName(name);
// };

exports.getFileById = function(id) {
    return fileDao.getFileById(id);
};

exports.getAllFiles = function() {
    return fileDao.getAllFiles();
};

exports.deleteFileById = function(id) {
    return fileDao.deleteFileById(id);
};
