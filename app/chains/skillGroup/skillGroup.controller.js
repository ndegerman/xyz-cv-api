'use strict';

var skillGroupDao = require('./skillGroup.dao');
var Promise = require('bluebird');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

// TODO: Make the validation more covering
function validateSkillGroup(skillGroup) {
    return new Promise(function(resolve, reject) {
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

exports.getSkillGroupById = function(id) {
    return skillGroupDao.getSkillGroupById(id);
};

exports.getSkillGroups = function(query) {
    return skillGroupDao.getSkillGroups(query);
};

exports.deleteSkillGroupById = function(id) {
    return skillGroupDao.deleteSkillGroupById(id);
};
