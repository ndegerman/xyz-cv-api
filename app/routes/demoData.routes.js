'use strict';

/**
 * Module dependencies.
 */

var attributeController = require('../controllers/attribute.controller');
var officeController = require('../controllers/office.controller');
var roleController = require('../controllers/role.controller');
var roleToAttributeConnectorController = require('../controllers/roleToAttributeConnector.controller');
var skillController = require('../controllers/skill.controller');
var skillGroupController = require('../controllers/skillGroup.controller');
var skillToSkillGroupConnectorController = require('../controllers/skillToSkillGroupConnector.controller');
var userController = require('../controllers/user.controller');
var userToOfficeConnectorController = require('../controllers/userToOfficeConnector.controller');
var userToSkillConnectorController = require('../controllers/userToSkillConnector.controller');

var responseHandler = require('../utils/response.handler');
var randomHandler = require('../utils/random.handler');

var faker = require('faker');
var config = require('config');
var userLimit = config.DEMO.USER_LIMIT;
var skillLimit = config.DEMO.SKILL_LIMIT;
var q = require('q');

var officesConnected = 0;
var skillsConnected = 0;

module.exports = function(routes) {

    // setup demo data
    routes.post('/', function(request, response) {
        addAll()
            .then(addConnectors)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    routes.delete('/', function(request, response) {
        purgeAll()
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
    purge.push(purgeOffices());
    purge.push(purgeSkillGroups());

    purge.push(purgeUserToSkillConnectors());
    purge.push(purgeRoleToAttributeConnectors());
    purge.push(purgeSkillToSkillGroupConnectors());
    purge.push(purgeUserToOfficeConnectors());
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

function purgeOffices() {
    return q.promise(function(resolve) {
        officeController.getAllOffices()
            .then(function(offices) {
                return q.all(applyDeleteOnItems(offices, officeController.deleteOfficeById))
                    .then(resolve);
            });
    });
}

function purgeSkillGroups() {
    return q.promise(function(resolve) {
        skillGroupController.getAllSkillGroups()
            .then(function(skillGroups) {
                return q.all(applyDeleteOnItems(skillGroups, skillGroupController.deleteSkillGroupById))
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

function purgeSkillToSkillGroupConnectors() {
    return q.promise(function(resolve) {
        skillToSkillGroupConnectorController.getAllSkillToSkillGroupConnectors()
            .then(function(skillToSkillGroupConnectors) {
                return q.all(applyDeleteOnItems(skillToSkillGroupConnectors, skillToSkillGroupConnectorController.deleteSkillToSkillGroupConnectorById))
                    .then(resolve);
            });
    });
}

function purgeUserToOfficeConnectors() {
    return q.promise(function(resolve) {
        userToOfficeConnectorController.getAllUserToOfficeConnectors()
            .then(function(userToOfficeConnectors) {
                return q.all(applyDeleteOnItems(userToOfficeConnectors, userToOfficeConnectorController.deleteUserToOfficeConnectorById))
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
    added.push(addOffices());
    return q.all(added);
}

function addUsers() {
    var users = [];
    for (var i = 0; i < userLimit; i++) {
        var firstName = faker.name.firstName();
        var lastName = faker.name.lastName();
        var fullName = firstName + ' ' + lastName;
        var email = firstName + '.' + lastName + '@softhouse.se';
        email = email.toLowerCase();

        var user = {
            name: fullName,
            email: email,
            role: 'user'
        };
        users.push(user);
    }

    return q.all(applyAddOnItems(users, userController.createNewUser));
}

function addSkills() {
    var skills = [];

    var abbreviations = randomHandler.getSkillAbbreviations(config.DEMO.NUMBER_OF_SKILLS);
    abbreviations.forEach(function(abbreviation) {
        skills.push({name: abbreviation});
    });

    console.log('%d skills generated', abbreviations.length);

    return q.all(applyAddOnItems(skills, skillController.createNewSkill));
}

function addOffices() {
    var offices = [
        {
            name: 'Karlskrona'
        },
        {
            name: 'Växjö'
        },
        {
            name: 'Stockholm'
        }
    ];
    return q.all(applyAddOnItems(offices, officeController.createNewOffice));
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

    promises.push(roleController.getRoleByName('admin')
        .then(connectRoleAndAttributes));

    promises.push(userController.getAllUsers()
        .then(connectUsersAndRandomOffice));

    promises.push(userController.getAllUsers()
        .then(connectUsersAndRandomSkills));

    return q.all(promises);
}

function connectUsersAndRandomSkills(users) {
    return q.promise(function(resolve) {
        var promises = [];
        users.forEach(function(user) {
            promises.push(skillController.getAllSkills()
                .then(connectUserAndRandomSkills(user)));
        });

        return q.all(promises)
            .then(resolve);
    });
}

function connectUserAndRandomSkills(user) {
    return function(skills) {
        return q.promise(function(resolve) {
            var promises = [];
            skills.forEach(function(skill) {
                if (randomHandler.bernoulli(config.DEMO.SKILL_ON_USER_PROBABILITY)) {
                    promises.push(userToSkillConnectorController.createUserToSkillConnector({userId: user._id, skillId: skill._id}));
                }
            });

            return q.all(promises)
                .then(resolve);
        });

    };
}

function connectUsersAndRandomOffice(users) {
    return q.promise(function(resolve) {
        var promises = [];
        users.forEach(function(user) {
            promises.push(officeController.getAllOffices()
                .then(connectUserAndRandomOffice(user)));
        });

        return q.all(promises)
            .then(resolve);
    });
}

function connectUserAndRandomOffice(user) {
    return function(offices) {
        var officeNumber = faker.random.number(offices.length - 1);
        var office = offices[officeNumber];
        return userToOfficeConnectorController.createUserToOfficeConnector({userId: user._id, officeId: office._id});
    };
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
