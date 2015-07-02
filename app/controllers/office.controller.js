'use strict';

var officeDao = require('../dao/office.dao');
var q = require('q');
var errorHandler = require('../utils/error.handler');

// TODO: Make the validation more covering
function validateOffice(office) {
    return q.promise(function(resolve, reject) {
        if (office && office.name) {
            return resolve(office);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

exports.getOfficeTemplate = function() {
    return {
        name: null
    };
};

exports.createNewOffice = function(officeObject) {
    return validateOffice(officeObject)
        .then(officeDao.createNewOffice);
};

exports.getOfficeByName = function(name) {
    return officeDao.getOfficeByName(name);
};

exports.getOfficeById = function(id) {
    return officeDao.getOfficeById(id);
};

exports.getAllOffices = function() {
    return officeDao.getAllOffices();
};

exports.deleteOfficeById = function(id) {
    return officeDao.deleteOfficeById(id);
};
