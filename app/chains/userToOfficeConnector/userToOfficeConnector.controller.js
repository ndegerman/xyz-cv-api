'use strict';

var q = require('q');
var userToOfficeConnectorDao = require('./userToOfficeConnector.dao');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

function validateUserToOfficeConnector(userToOfficeConnector) {
    return q.promise(function(resolve, reject) {
        if (userToOfficeConnector && userToOfficeConnector.userId && userToOfficeConnector.officeId) {
            userToOfficeConnector = utils.extend(getUserToOfficeConnectorTemplate(), userToOfficeConnector);
            return resolve(userToOfficeConnector);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getUserToOfficeConnectorTemplate() {
    return {
        userId: null,
        officeId: null
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

    return q.all(promises);
};

exports.createUserToOfficeConnector = function(userToOfficeConnector) {
    return validateUserToOfficeConnector(userToOfficeConnector)
        .then(userToOfficeConnectorDao.createUserToOfficeConnector);
};

exports.getUserToOfficeConnectorsByUserId = function(userId) {
    return userToOfficeConnectorDao.getUserToOfficeConnectorsByUserId(userId);
};

exports.getUserToOfficeConnectorsByOfficeId = function(officeId) {
    return userToOfficeConnectorDao.getUserToOfficeConnectorsByOfficeId(officeId);
};

exports.getAllUserToOfficeConnectors = function() {
    return userToOfficeConnectorDao.getAllUserToOfficeConnectors();
};

exports.deleteUserToOfficeConnectorById = function(id) {
    return userToOfficeConnectorDao.deleteUserToOfficeConnector(id);
};

exports.deleteUserToOfficeConnectors = function(userToOfficeConnectors) {
    var promises = [];
    userToOfficeConnectors.forEach(function(userToOfficeConnector) {
        promises.push(exports.deleteUserToOfficeConnectorById(userToOfficeConnector._id));
    });

    return q.all(promises);
};

exports.deleteUserToOfficeConnectorsByUserId = function(userId) {
    return exports.getUserToOfficeConnectorsByUserId(userId)
        .then(exports.deleteUserToOfficeConnectors);
};
