'use strict';

var q = require('q');
var skillToSkillGroupConnectorDao = require('../dao/skillToSkillGroupConnector.dao');
var errorHandler = require('../utils/error.handler');

function validateSkillToSkillGroupConnector(skillToSkillGroupConnector) {
    return q.promise(function(resolve, reject) {
        if (skillToSkillGroupConnector && skillToSkillGroupConnector.skillGroupId && skillToSkillGroupConnector.skillId) {
            return resolve(skillToSkillGroupConnector);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

exports.assignSkillsToSkillGroup = function(skills, skillGroupId) {
    var promises = [];
    skills.forEach(function(skillId) {
        var skillToSkillGroupConnector = {
            skillGroupId: skillGroupId,
            skillId: skillId
        };
        promises.push(exports.createSkillToSkillGroupConnector(skillToSkillGroupConnector));
    });

    return q.all(promises);
};

exports.createSkillToSkillGroupConnector = function(skillToSkillGroupConnector)
    {return validateSkillToSkillGroupConnector(skillToSkillGroupConnector)
        .then(skillToSkillGroupConnectorDao.createSkillToSkillGroupConnector);
};

exports.getSkillToSkillGroupConnectorsBySkillGroupId = function(skillGroupId) {
    return skillToSkillGroupConnectorDao.getSkillToSkillGroupConnectorsBySkillGroupId(skillGroupId);
};

exports.getSkillToSkillGroupConnectorsBySkillId = function(skillId) {
    return skillToSkillGroupConnectorDao.getSkillToSkillGroupConnectorsBySkillId(skillId);
};

exports.getAllSkillToSkillGroupConnectors = function() {
    return skillToSkillGroupConnectorDao.getAllSkillToSkillGroupConnectors();
};

exports.deleteSkillToSkillGroupConnectorById = function(id) {
    return skillToSkillGroupConnectorDao.deleteSkillToSkillGroupConnector(id);
};

exports.deleteSkillToSkillGroupConnectors = function(skillToSkillGroupConnector) {
    var promises = [];
    skillToSkillGroupConnector.forEach(function(skillToSkillGroupConnector) {
        promises.push(exports.deleteSkillToSkillGroupConnectorById(skillToSkillGroupConnector._id));
    });

    return q.all(promises);
};

exports.deleteSkillToSkillGroupConnectorsBySkillGroupId = function(skillGroupId) {
    return exports.getSkillToSkillGroupConnectorsBySkillGroupId(skillGroupId)
        .then(exports.deleteSkillToSkillGroupConnectors);
};
