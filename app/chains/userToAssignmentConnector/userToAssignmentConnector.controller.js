'use strict';

var Promise = require('bluebird');
var userToAssignmentConnectorDao = require('./userToAssignmentConnector.dao');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

function validateUserToAssignmentConnector(userToAssignmentConnector) {
    return new Promise(function(resolve, reject) {
        if (userToAssignmentConnector && userToAssignmentConnector.userId && userToAssignmentConnector.assignmentId) {
            userToAssignmentConnector = utils.extend(getUserToAssignmentConnectorTemplate(), userToAssignmentConnector);
            return resolve(userToAssignmentConnector);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function setUserToAssignmentConnectorProperties(body) {
    function extend(userToAssignmentConnector, props) {
        for (var prop in userToAssignmentConnector) {
            if (userToAssignmentConnector.hasOwnProperty(prop) && props.hasOwnProperty(prop)) {
                userToAssignmentConnector[prop] = props[prop];
            }
        }
    }

    return function(userToAssignmentConnector) {
        extend(userToAssignmentConnector, body);
        return userToAssignmentConnector;
    };
}

function getUserToAssignmentConnectorTemplate() {
    return {
        userId: null,
        assignmentId: null,
        skills: [],
        dateFrom: null,
        dateTo: null,
        description: null
    };
}

exports.assignAssignmentsToUser = function(assignments, userId) {
    var promises = [];
    assignments.forEach(function(assignmentId) {
        var userToAssignmentConnector = {
            userId: userId,
            assignmentId: assignmentId
        };
        promises.push(exports.createUserToAssignmentConnector(userToAssignmentConnector));
    });

    return Promise.all(promises);
};

exports.createUserToAssignmentConnector = function(userToAssignmentConnector) {
    return validateUserToAssignmentConnector(userToAssignmentConnector)
        .then(userToAssignmentConnectorDao.createUserToAssignmentConnector);
};

exports.getUserToAssignmentConnectorById = function(id) {
    return userToAssignmentConnectorDao.getUserToAssignmentConnectorById(id);
};

exports.getUserToAssignmentConnectorsByUserId = function(userId) {
    return userToAssignmentConnectorDao.getUserToAssignmentConnectorsByUserId(userId);
};

exports.getUserToAssignmentConnectorsByAssignmentId = function(assignmentId) {
    return userToAssignmentConnectorDao.getUserToAssignmentConnectorsByAssignmentId(assignmentId);
};

exports.getAllUserToAssignmentConnectors = function() {
    return userToAssignmentConnectorDao.getAllUserToAssignmentConnectors();
};

exports.updateUserToAssignmentConnector = function(id, body, email) {
    return exports.getUserToAssignmentConnectorById(id)
        .then(setUserToAssignmentConnectorProperties(body))
        .then(validateUserToAssignmentConnector)
        .then(userToAssignmentConnectorDao.updateUserToAssignmentConnector);
};

exports.deleteUserToAssignmentConnectorById = function(id) {
    return userToAssignmentConnectorDao.deleteUserToAssignmentConnector(id);
};

exports.deleteUserToAssignmentConnectors = function(userToAssignmentConnectors) {
    var promises = [];
    userToAssignmentConnectors.forEach(function(userToAssignmentConnector) {
        promises.push(exports.deleteUserToAssignmentConnectorById(userToAssignmentConnector._id));
    });

    return Promise.all(promises);
};

exports.deleteUserToAssignmentConnectorsByUserId = function(userId) {
    return exports.getUserToAssignmentConnectorsByUserId(userId)
        .then(exports.deleteUserToAssignmentConnectors);
};
