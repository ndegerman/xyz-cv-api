'use strict';

var q = require('q');
var userSkillConnectorDao = require('../dao/userSkillConnector.dao');
var errorHandler = require('../utils/error.handler');

function validateUserSkillConnector(userSkillConnector) {
    return q.promise(function(resolve, reject) {
        if (userSkillConnector && userSkillConnector.userId && userSkillConnector.skillId) {
            return resolve(userSkillConnector);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

exports.assignSkillsToUser = function(skills, userId) {
    var promises = [];
    skills.forEach(function(skillId) {
        var userSkillConnector = {
            userId: userId,
            skillId: skillId
        };
        promises.push(exports.createUserSkillConnector(userSkillConnector));
    });

    return q.all(promises);
};

exports.createUserSkillConnector = function(userSkillConnector) {
    return validateUserSkillConnector(userSkillConnector)
        .then(userSkillConnectorDao.createUserSkillConnector);
};

exports.getUserSkillConnectorsByUserId = function(userId) {
    return userSkillConnectorDao.getUserSkillConnectorsByUserId(userId);
};

exports.getUserSkillConnectorsBySkillId = function(skillId) {
    return userSkillConnectorDao.getUserSkillConnectorsBySkillId(skillId);
};

exports.getAllUserSkillConnectors = function() {
    return userSkillConnectorDao.getAllUserSkillConnectors();
};

exports.deleteUserSkillConnectorById = function(id) {
    return userSkillConnectorDao.deleteUserSkillConnector(id);
};

exports.deleteUserSkillConnectors = function(userSkillConnectors) {
    var promises = [];
    userSkillConnectors.forEach(function(userSkillConnector) {
        promises.push(exports.deleteUserSkillConnectorById(userSkillConnector._id));
    });

    return q.all(promises);
};

exports.deleteUserSkillConnectorsByUserId = function(userId) {
    return exports.getUserSkillConnectorsByUserId(userId)
        .then(exports.deleteUserSkillConnectors);
};
