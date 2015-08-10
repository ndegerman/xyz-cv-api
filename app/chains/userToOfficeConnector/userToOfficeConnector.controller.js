'use strict';

var Promise = require('bluebird');
var userToOfficeConnectorDao = require('./userToOfficeConnector.dao');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

function validateUserToOfficeConnector(userToOfficeConnector) {
    return new Promise(function(resolve, reject) {
        if (userToOfficeConnector && userToOfficeConnector.userId && userToOfficeConnector.officeId) {
            userToOfficeConnector = utils.extend(getUserToOfficeConnectorTemplate(), userToOfficeConnector);
            return resolve(userToOfficeConnector);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function setUserToOfficeConnectorProperties(body) {
    return function(userToOfficeConnector) {
        return new Promise(function(resolve, reject) {
            userToOfficeConnector = utils.extend(userToOfficeConnector, body);
            return resolve(userToOfficeConnector);
        });
    };
}

function getUserToOfficeConnectorTemplate() {
    return {
        userId: null,
        officeId: null
    };
}

function setIdOnConnector(id) {
    return function(userToOfficeConnector) {
        return new Promise(function(resolve, reject) {
            userToOfficeConnector._id = id;
            return resolve(userToOfficeConnector);
        });
    };
}

exports.assignOfficesToUser = function(offices, userId) {
    var promises = [];
    offices.forEach(function(officeId) {
        var userToOfficeConnector = {
            userId: userId,
            officeId: officeId
        };
        promises.push(exports.createUserToOfficeConnector(userToOfficeConnector));
    });

    return Promise.all(promises);
};

exports.createUserToOfficeConnector = function(userToOfficeConnector) {
    return validateUserToOfficeConnector(userToOfficeConnector)
        .then(userToOfficeConnectorDao.createUserToOfficeConnector);
};

exports.getUserToOfficeConnectors = function(query) {
    return userToOfficeConnectorDao.getUserToOfficeConnectors(query);
};

exports.getUserToOfficeConnectorById = function(id) {
    return userToOfficeConnectorDao.getUserToOfficeConnectorById(id);
};

exports.updateUserToOfficeConnector = function(id, body, email) {
    return exports.getUserToOfficeConnectorById(id)
        .then(setUserToOfficeConnectorProperties(body))
        .then(validateUserToOfficeConnector)
        .then(setIdOnConnector(id))
        .then(userToOfficeConnectorDao.updateUserToOfficeConnector);
};

exports.deleteUserToOfficeConnectorById = function(id) {
    return userToOfficeConnectorDao.deleteUserToOfficeConnector(id);
};

exports.deleteUserToOfficeConnectors = function(userToOfficeConnectors) {
    var promises = [];
    userToOfficeConnectors.forEach(function(userToOfficeConnector) {
        promises.push(exports.deleteUserToOfficeConnectorById(userToOfficeConnector._id));
    });

    return Promise.all(promises);
};

exports.deleteUserToOfficeConnectorsByUserId = function(userId) {
    return exports.getUserToOfficeConnectorsByUserId(userId)
        .then(exports.deleteUserToOfficeConnectors);
};
