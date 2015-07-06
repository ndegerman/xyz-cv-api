'use strict';

/**
 * Module dependencies.
 */

var attributeController = require('../controllers/attribute.controller');
var roleController = require('../controllers/role.controller');
var userController = require('../controllers/user.controller');
var skillController = require('../controllers/skill.controller');
var userToSkillConnectorController = require('../controllers/userToSkillConnector.controller');
var roleToAttributeConnectorController = require('../controllers/roleToAttributeConnector.controller');

var responseHandler = require('../utils/response.handler');

var q = require('q');

module.exports = function(routes) {

    // setup demo data
    routes.get('/', function(request, response) {
        purgeAll()
            .then(addAll)
            .then(addConnectors)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};

// PURGE
// ============================================================================

function purgeAll() {
    var purge = [];
    purge.push(purgeUsers());
    purge.push(purgeRoles());
    purge.push(purgeAttributes());
    purge.push(purgeSkills());
    purge.push(purgeUserToSkillConnectors());
    purge.push(purgeRoleToAttributeConnectors());
    return q.all(purge);
}

function purgeUsers() {
    return q.promise(function(resolve) {
        userController.getAllUsers()
            .then(function(users) {
                return q.all(applyDeleteOnItems(users, userController.deleteUserById))
                    .then(resolve);
            });
    });
}

function purgeRoles() {
    return q.promise(function(resolve) {
        roleController.getAllRoles()
            .then(function(roles) {
                return q.all(applyDeleteOnItems(roles, roleController.deleteRoleById))
                    .then(resolve);
            });
    });
}

function purgeAttributes() {
    return q.promise(function(resolve) {
        attributeController.getAllAttributes()
            .then(function(attributes) {
                return q.all(applyDeleteOnItems(attributes, attributeController.deleteAttributeById))
                    .then(resolve);
            });
    });
}

function purgeSkills() {
    return q.promise(function(resolve) {
        skillController.getAllSkills()
            .then(function(skills) {
                return q.all(applyDeleteOnItems(skills, skillController.deleteSkillById))
                    .then(resolve);
            });
    });
}

function purgeUserToSkillConnectors() {
    return q.promise(function(resolve) {
        userToSkillConnectorController.getAllUserToSkillConnectors()
            .then(function(userToSkillConnectors) {
                return q.all(applyDeleteOnItems(userToSkillConnectors, userToSkillConnectorController.deleteUserToSkillConnectorById))
                    .then(resolve);
            });
    });
}

function purgeRoleToAttributeConnectors() {
    return q.promise(function(resolve) {
        roleToAttributeConnectorController.getAllRoleToAttributeConnectors()
            .then(function(roleToAttributeConnectors) {
                return q.all(applyDeleteOnItems(roleToAttributeConnectors, roleToAttributeConnectorController.deleteRoleToAttributeConnectorById))
                    .then(resolve);
            });
    });
}

// ADD ENTITIES
// ============================================================================

function addAll() {
    var added = [];
    added.push(addUsers());
    added.push(addRoles());
    added.push(addAttributes());
    added.push(addSkills());
    return q.all(added);
}

function addUsers() {
    var users = [
        {
            name: 'rasmus letterkrantz',
            email: 'rasmus.letterkrantz@gmail.com',
            role: 'admin'
        },
        {
            name: 'sara thorman',
            email: 'sara.thorman@gmail.com',
            role: 'user'
        }
    ];
    return q.all(applyAddOnItems(users, userController.createNewUser));
}

function addSkills() {
    var skills = [
        {
            name: 'Java'
        },
        {
            name: 'c++'
        },
        {
            name: 'Haskell'
        }
    ];
    return q.all(applyAddOnItems(skills, skillController.createNewSkill));
}

function addAttributes() {
    var attributes = [
        {
            name: 'canViewProfile'
        },
        {
            name: 'caneEditProfile'
        }
    ];
    return q.all(applyAddOnItems(attributes, attributeController.createNewAttribute));
}

function addRoles() {
    var roles = [
        {
            name: 'user'
        },
        {
            name: 'admin'
        }
    ];
    return q.all(applyAddOnItems(roles, roleController.createNewRole));
}

// ADD CONNECTORS
// ============================================================================

function addConnectors() {
    var promises = [];
    promises.push(userController.getUserByEmail('rasmus.letterkrantz@gmail.com')
        .then(connectUserAndSkills));
    promises.push(roleController.getRoleByName('admin')
        .then(connectRoleAndAttributes));
    return q.all(promises);
}

function connectUserAndSkills(user) {
    return skillController.getAllSkills()
        .then(function(skills) {
            return q.promise(function(resolve) {
                var promises = [];
                skills.forEach(function(skill) {
                    promises.push(userToSkillConnectorController.createUserToSkillConnector({userId: user._id, skillId: skill._id}));
                });

                return q.all(promises)
                    .then(resolve);
            });
        });
}

function connectRoleAndAttributes(role) {
    return attributeController.getAllAttributes()
        .then(function(attributes) {
            return q.promise(function(resolve) {
                var promises = [];
                attributes.forEach(function(attribute) {
                    promises.push(roleToAttributeConnectorController.createRoleToAttributeConnector({roleId: role._id, attributeId: attribute._id}));
                });

                return q.all(promises)
                    .then(resolve);
            });
        });
}

// UTIL
// ============================================================================

function applyDeleteOnItems(items, applyFunction) {
    var promises = [];
    items.forEach(function(item) {
        promises.push(applyFunction(item._id));
    });

    return promises;
}

function applyAddOnItems(items, applyFunction) {
    var promises = [];
    items.forEach(function(item) {
        promises.push(applyFunction(item));
    });

    return promises;
}
