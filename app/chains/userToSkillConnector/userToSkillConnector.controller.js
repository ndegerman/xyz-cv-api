'use strict';

var q = require('q');
var userToSkillConnectorDao = require('./userToSkillConnector.dao');
var errorHandler = require('../../utils/error.handler');

function validateUserToSkillConnector(userToSkillConnector) {
    return q.promise(function(resolve, reject) {
        if (userToSkillConnector && userToSkillConnector.userId && userToSkillConnector.skillId && userToSkillConnector.level) {
            if ((userToSkillConnector.level >= 1) && (userToSkillConnector.level <= 5) && (userToSkillConnector.years > 0)) {
                return resolve(userToSkillConnector);
            }
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function setUserToSkillConnectorProperties(body) {
    function extend(userToSkillConnector, props) {
        for (var prop in userToSkillConnector) {
            if (userToSkillConnector.hasOwnProperty(prop) && props.hasOwnProperty(prop)) {
                userToSkillConnector[prop] = props[prop];
            }
        }
    }

    return function(userToSkillConnector) {
        extend(userToSkillConnector, body);
        return userToSkillConnector;
    };
}

exports.assignSkillsToUser = function(skills, userId) {
    var promises = [];
    skills.forEach(function(skillId) {
        var userToSkillConnector = {
            userId: userId,
            skillId: skillId
        };
        promises.push(exports.createUserToSkillConnector(userToSkillConnector));
    });

    return q.all(promises);
};

exports.createUserToSkillConnector = function(userToSkillConnector) {
    return validateUserToSkillConnector(userToSkillConnector)
        .then(userToSkillConnectorDao.createUserToSkillConnector);
};

exports.getUserToSkillConnectorById = function(id) {
    return userToSkillConnectorDao.getUserToSkillConnectorById(id);
};

exports.getUserToSkillConnectorsByUserId = function(userId) {
    return userToSkillConnectorDao.getUserToSkillConnectorsByUserId(userId);
};

exports.getUserToSkillConnectorsBySkillId = function(skillId) {
    return userToSkillConnectorDao.getUserToSkillConnectorsBySkillId(skillId);
};

exports.getAllUserToSkillConnectors = function() {
    return userToSkillConnectorDao.getAllUserToSkillConnectors();
};

exports.updateUserToSkillConnector = function(id, body, email) {
    return exports.getUserToSkillConnectorById(id)
        .then(setUserToSkillConnectorProperties(body))
        .then(validateUserToSkillConnector)
        .then(userToSkillConnectorDao.updateUserToSkillConnector);
};

exports.deleteUserToSkillConnectorById = function(id) {
    return userToSkillConnectorDao.deleteUserToSkillConnector(id);
};

exports.deleteUserToSkillConnectors = function(userToSkillConnectors) {
    var promises = [];
    userToSkillConnectors.forEach(function(userToSkillConnector) {
        promises.push(exports.deleteUserToSkillConnectorById(userToSkillConnector._id));
    });

    return q.all(promises);
};

exports.deleteUserToSkillConnectorsByUserId = function(userId) {
    return exports.getUserToSkillConnectorsByUserId(userId)
        .then(exports.deleteUserToSkillConnectors);
};
