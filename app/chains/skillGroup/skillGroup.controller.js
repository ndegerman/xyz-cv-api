'use strict';

var skillGroupDao = require('./skillGroup.dao');
var q = require('q');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

// TODO: Make the validation more covering
function validateSkillGroup(skillGroup) {
    return q.promise(function(resolve, reject) {
        if (skillGroup && skillGroup.name) {
            skillGroup = utils.extend(getSkillGroupTemplate(), skillGroup);
            return resolve(skillGroup);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getSkillGroupTemplate() {
    return {
        name: null
    };
}

exports.createNewSkillGroup = function(skillGroupObject) {
    return validateSkillGroup(skillGroupObject)
        .then(skillGroupDao.createNewSkillGroup);
};

exports.getSkillGroupByName = function(name) {
    return skillGroupDao.getSkillGroupByName(name);
};

exports.getSkillGroupById = function(id) {
    return skillGroupDao.getSkillGroupById(id);
};

exports.getAllSkillGroups = function() {
    return skillGroupDao.getAllSkillGroups();
};

exports.deleteSkillGroupById = function(id) {
    return skillGroupDao.deleteSkillGroupById(id);
};
