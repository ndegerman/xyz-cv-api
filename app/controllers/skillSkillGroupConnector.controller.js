'use strict';

var q = require('q');
var skillSkillGroupConnectorDao = require('../dao/skillSkillGroupConnector.dao');
var errorHandler = require('../utils/error.handler');

function validateSkillSkillGroupConnector(skillSkillGroupConnector) {
    return q.promise(function(resolve, reject) {
        if (skillSkillGroupConnector && skillSkillGroupConnector.skillGroupId && skillSkillGroupConnector.skillId) {
            return resolve(skillSkillGroupConnector);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

exports.assignSkillsToSkillGroup = function(skills, skillGroupId) {
    var promises = [];
    skills.forEach(function(skillId) {
        var skillSkillGroupConnector = {
            skillGroupId: skillGroupId,
            skillId: skillId
        };
        promises.push(exports.createSkillSkillGroupConnector(skillSkillGroupConnector));
    });

    return q.all(promises);
};

exports.createSkillSkillGroupConnector = function(skillSkillGroupConnector)
    {return validateSkillSkillGroupConnector(skillSkillGroupConnector)
        .then(skillSkillGroupConnectorDao.createSkillSkillGroupConnector);
};

exports.getSkillSkillGroupConnectorsBySkillGroupId = function(skillGroupId) {
    return skillSkillGroupConnectorDao.getSkillSkillGroupConnectorsBySkillGroupId(skillGroupId);
};

exports.getSkillSkillGroupConnectorsBySkillId = function(skillId) {
    return skillSkillGroupConnectorDao.getSkillSkillGroupConnectorsBySkillId(skillId);
};

exports.getAllSkillSkillGroupConnectors = function() {
    console.log('1');
    return skillSkillGroupConnectorDao.getAllSkillSkillGroupConnectors();
};

exports.deleteSkillSkillGroupConnectorById = function(id) {
    return skillSkillGroupConnectorDao.deleteSkillSkillGroupConnector(id);
};

exports.deleteSkillSkillGroupConnectors = function(skillSkillGroupConnector) {
    var promises = [];
    skillSkillGroupConnector.forEach(function(skillSkillGroupConnector) {
        promises.push(exports.deleteSkillSkillGroupConnectorById(skillSkillGroupConnector._id));
    });

    return q.all(promises);
};

exports.deleteSkillSkillGroupConnectorsBySkillGroupId = function(skillGroupId) {
    return exports.getSkillSkillGroupConnectorsBySkillGroupId(skillGroupId)
        .then(exports.deleteSkillSkillGroupConnectors);
};
