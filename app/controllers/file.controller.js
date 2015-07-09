'use strict';

var fileDao = require('../dao/file.dao');
var q = require('q');
var errorHandler = require('../utils/error.handler');

function getFileTemplate() {
    return {
        originalName: null,
        generatedName: null
    };
}

exports.createNewFile = function(originalName) {
    return function(generatedName) {
        var file = getFileTemplate();
        file.originalName = originalName;
        file.generatedName = generatedName.substring(8, generatedName.length);
        fileDao.createNewFile(file);
    };
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
