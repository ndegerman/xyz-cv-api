'use strict';

var multer = require('multer');
var fs = require('fs');

exports.getHandler = function() {
    return multer(getConfig());
};

function getConfig() {
    return {
        dest: './uploads/',
        limits: {
            files: 1,
            fileSize: 5 * 1024 * 1024
        },

        onFileUploadStart: function(file, request, response) {
            console.log(file.fieldname + ' is uploading...');
            if (file.extension !== 'PNG') {
                file.failed = true;
                console.log('Failed: not a PNG file.');
                return false;
            }
        },

        onFileUploadComplete: function(file, request, response) {
            if (!file.failed) {
                console.log(file.fieldname + ' uploaded to ' + file.path);
            }
        },

        onError: function(error, next) {
            console.log(error);
            next(error);
        },

        onFileSizeLimit: function(file) {
            console.log('Failed: reached max size when uploading ' + file.originalname);
            fs.unlink('./' + file.path);
            file.failed = true;
        },

        onFilesLimit: function() {
            console.log('Crossed file limit!');
        }
    };
}
