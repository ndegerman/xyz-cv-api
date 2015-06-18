'use strict';

var skillDao = require('../dao/skill.dao');
var q = require('q');
var errorHandler = require('../utils/error.handler');

// TODO: Make the validation more covering
function validateSkill(skill) {
    return q.promise(function(resolve, reject) {
        if (skill && skill.name) {
            return resolve(skill);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

exports.getSkillTemplate = function() {
    return {
        name: null
    };
};

exports.createNewSkill = function(skillObject) {
    return validateSkill(skillObject)
        .then(skillDao.createNewSkill);
};

exports.getSkillByName = function(name) {
    return skillDao.getSkillByName(name);
};

exports.getSkillById = function(id) {
    return skillDao.getSkillById(id);
};

exports.getAllSkills = function() {
    return skillDao.getAllSkills();
};

exports.deleteSkillById = function(id) {
    return skillDao.deleteSkillById(id);
};
