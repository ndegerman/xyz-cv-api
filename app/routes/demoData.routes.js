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
var q = require('q');

module.exports = function(routes) {

    // setup demo data
    routes.post('/', function(request, response) {
        addAll()
            .then(addConnectors)
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    routes.delete('/', function(request, response) {
        purgeAll()
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
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
                return q.all(applyDeleteOnItemRec(users, 0, userController.deleteUserById))
                    .then(resolve);
            });
    });
}

function purgeRoles() {
    return q.promise(function(resolve) {
        roleController.getAllRoles()
            .then(function(roles) {
                return q.all(applyDeleteOnItemRec(roles, 0, roleController.deleteRoleById))
                    .then(resolve);
            });
    });
}

function purgeAttributes() {
    return q.promise(function(resolve) {
        attributeController.getAllAttributes()
            .then(function(attributes) {
                return q.all(applyDeleteOnItemRec(attributes, 0, attributeController.deleteAttributeById))
                    .then(resolve);
            });
    });
}

function purgeSkills() {
    return q.promise(function(resolve) {
        skillController.getAllSkills()
            .then(function(skills) {
                return q.all(applyDeleteOnItemRec(skills, 0, skillController.deleteSkillById))
                    .then(resolve);
            });
    });
}

function purgeOffices() {
    return q.promise(function(resolve) {
        officeController.getAllOffices()
            .then(function(offices) {
                return q.all(applyDeleteOnItemRec(offices, 0, officeController.deleteOfficeById))
                    .then(resolve);
            });
    });
}

function purgeSkillGroups() {
    return q.promise(function(resolve) {
        skillGroupController.getAllSkillGroups()
            .then(function(skillGroups) {
                return q.all(applyDeleteOnItemRec(skillGroups, 0, skillGroupController.deleteSkillGroupById))
                    .then(resolve);
            });
    });
}

function purgeUserToSkillConnectors() {
    return q.promise(function(resolve) {
        userToSkillConnectorController.getAllUserToSkillConnectors()
            .then(function(userToSkillConnectors) {
                return q.all(applyDeleteOnItemRec(userToSkillConnectors, 0, userToSkillConnectorController.deleteUserToSkillConnectorById))
                    .then(resolve);
            });
    });
}

function purgeRoleToAttributeConnectors() {
    return q.promise(function(resolve) {
        roleToAttributeConnectorController.getAllRoleToAttributeConnectors()
            .then(function(roleToAttributeConnectors) {
                return q.all(applyDeleteOnItemRec(roleToAttributeConnectors, 0, roleToAttributeConnectorController.deleteRoleToAttributeConnectorById))
                    .then(resolve);
            });
    });
}

function purgeSkillToSkillGroupConnectors() {
    return q.promise(function(resolve) {
        skillToSkillGroupConnectorController.getAllSkillToSkillGroupConnectors()
            .then(function(skillToSkillGroupConnectors) {
                return q.all(applyDeleteOnItemRec(skillToSkillGroupConnectors, 0, skillToSkillGroupConnectorController.deleteSkillToSkillGroupConnectorById))
                    .then(resolve);
            });
    });
}

function purgeUserToOfficeConnectors() {
    return q.promise(function(resolve) {
        userToOfficeConnectorController.getAllUserToOfficeConnectors()
            .then(function(userToOfficeConnectors) {
                return q.all(applyDeleteOnItemRec(userToOfficeConnectors, 0, userToOfficeConnectorController.deleteUserToOfficeConnectorById))
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
    for (var i = 0; i < config.DEMO.USER_LIMIT; i++) {
        var firstName = faker.name.firstName();
        var lastName = faker.name.lastName();
        var fullName = firstName + ' ' + lastName;
        var email = firstName + '.' + lastName + '@softhouse.se';
        email = email.toLowerCase();
        var position = faker.name.title();

        var user = {
            name: fullName,
            email: email,
            role: 'user',
            phoneNumber: faker.phone.phoneNumberFormat(),
            employeeNumber: faker.random.number(2000),
            position: position,
            closestSuperior: faker.name.firstName() + ' ' + faker.name.lastName(),
            startDateOfEmployment: faker.date.past(),
            endDateOfEmployment: null,
            profileImage: null,
            personalIdNumber: faker.random.uuid,
            sex: randomHandler.generateSex(),
            description: faker.lorem.sentence(),
            personalInterests: randomHandler.getPersonalInterests(),
            linkedin: 'https://www.linkedin.com/in/williamhgates',
            facebook: 'https://www.facebook.com/BillGates',
            twitter: 'https://twitter.com/billgates',
            country: faker.address.country(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            ZIP: faker.address.zipCode()
        };
        users.push(user);
    }

    return q.all(applyAddOnItemsRec(users, 0, userController.createNewUser));
}

function addSkills() {
    var skills = [];

    var abbreviations = randomHandler.getSkillAbbreviations(config.DEMO.NUMBER_OF_SKILLS);
    abbreviations.forEach(function(abbreviation) {
        skills.push({name: abbreviation});
    });

    return q.all(applyAddOnItemsRec(skills, 0, skillController.createNewSkill));

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
    return q.all(applyAddOnItemsRec(offices, 0, officeController.createNewOffice));
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
    return q.all(applyAddOnItemsRec(attributes, 0, attributeController.createNewAttribute));
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
    return q.all(applyAddOnItemsRec(roles, 0, roleController.createNewRole));
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
    return skillController.getAllSkills()
        .then(function(skills) {
            return applyConnectOnItems(users, skills, 'userId', 'skillId', 0, 0, userToSkillConnectorController.createUserToSkillConnector, config.DEMO.SKILL_ON_USER_PROBABILITY);
        });
}

function connectUsersAndRandomOffice(users) {
    return officeController.getAllOffices()
        .then(function(offices) {
            return connectOneForItems(users, offices, 'userId', 'officeId', 0, userToOfficeConnectorController.createUserToOfficeConnector);
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

function applyDeleteOnItemRec(items, index, applyFunction) {
    return q.promise(function(resolve) {
        if (index >= items.length) {
            return resolve(items);
        }

        return applyFunction(items[index]._id)
            .then(function() {
                index++;
                return applyDeleteOnItemRec(items, index, applyFunction)
                    .then(resolve);
            });
    });
}

function applyAddOnItems(items, applyFunction) {
    var promises = [];
    items.forEach(function(item) {
        promises.push(applyFunction(item));
    });

    return promises;
}

function applyAddOnItemsRec(items, index, applyFunction) {
    return q.promise(function(resolve) {
        if (index >= items.length) {
            return resolve(items);
        }

        // console.log('applyAddOnItemsRec', items.length);
        // console.log('applyAddOnItemsRec', index);
        return applyFunction(items[index])
            .then(function() {
                index++;
                return applyAddOnItemsRec(items, index, applyFunction)
                    .then(resolve);
            });
    });
}

function applyConnectOnItems(items, connectToItems, itemsProp, connectToItemsProp, index1, index2, applyFunction, p) {
    return q.promise(function(resolve) {
        if (index1 >= items.length) {
            return resolve(items);
        }

        else if (index2 >= connectToItems.length) {
            index1++;
            index2 = 0;
            return applyConnectOnItems(items, connectToItems, itemsProp, connectToItemsProp, index1, index2, applyFunction, p)
                .then(resolve);
        }

        if (randomHandler.bernoulli(p)) {
            var connector = {};
            connector[itemsProp] = items[index1]._id;
            connector[connectToItemsProp] = connectToItems[index2]._id;

            return applyFunction(connector)
                .then(function() {
                    index2++;
                    return applyConnectOnItems(items, connectToItems, itemsProp, connectToItemsProp, index1, index2, applyFunction, p)
                        .then(resolve);
                });
        } else {
            index2++;

            return applyConnectOnItems(items, connectToItems, itemsProp, connectToItemsProp, index1, index2, applyFunction, p)
                .then(resolve);
        }
    });

}

function connectOneForItems(items, connectToItems, itemsProp, connectToItemsProp, index, applyFunction) {
    return q.promise(function(resolve) {
        if (index >= items.length) {
            return resolve(items);
        }

        var connector = {};
        connector[itemsProp] = items[index]._id;
        connector[connectToItemsProp] = connectToItems[faker.random.number(connectToItems.length - 1)];
        return applyFunction(connector)
            .then(function() {
                index++;
                return connectOneForItems(items, connectToItems, itemsProp, connectToItemsProp, index, applyFunction)
                    .then(resolve);
            });
    });

}
