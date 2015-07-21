'use strict';

/**
 * Module dependencies.
 */
var assignmentController = require('../chains/assignment/assignment.controller');
var attributeController = require('../chains/attribute/attribute.controller');
var officeController = require('../chains/office/office.controller');
var roleController = require('../chains/role/role.controller');
var roleToAttributeConnectorController = require('../chains/roleToAttributeConnector/roleToAttributeConnector.controller');
var skillController = require('../chains/skill/skill.controller');
var skillGroupController = require('../chains/skillGroup/skillGroup.controller');
var skillToSkillGroupConnectorController = require('../chains/skillToSkillGroupConnector/skillToSkillGroupConnector.controller');
var userController = require('../chains/user/user.controller');
var userToOfficeConnectorController = require('../chains/userToOfficeConnector/userToOfficeConnector.controller');
var userToSkillConnectorController = require('../chains/userToSkillConnector/userToSkillConnector.controller');
var userToAssignmentConnectorController = require('../chains/userToAssignmentConnector/userToAssignmentConnector.controller');

var responseHandler = require('../utils/response.handler');
var randomHandler = require('../utils/random.handler');

var faker = require('faker');
var config = require('config');
var q = require('q');
var ProgressBar = require('progress');
var bar;

module.exports = function(routes) {

    // setup demo data
    routes.post('/demo-data', function(request, response) {
        bar = new ProgressBar('[:bar] :percent', {
            total: 4 * config.DEMO.USER_LIMIT + config.DEMO.NUMBER_OF_SKILLS,
            incomplete: ' ',
            width: 20,
            clear: true
        });

        addAll()
            .then(addConnectors)
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    routes.delete('/purge', function(request, response) {
        bar = new ProgressBar('[:bar] :percent', {
            total: 12,
            incomplete: ' ',
            width: 20,
            clear: true
        });

        purgeAll()
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    routes.post('/default', function(request, response) {
        addAllDefault()
            .then(addConnectorsDefault)
            .then(responseHandler.sendSuccessfulPutJsonResponse(response))
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
    purge.push(purgeAssignments());

    purge.push(purgeUserToSkillConnectors());
    purge.push(purgeRoleToAttributeConnectors());
    purge.push(purgeSkillToSkillGroupConnectors());
    purge.push(purgeUserToOfficeConnectors());
    purge.push(purgeUserToAssignmentConnectors());
    return q.all(purge);
}

function purgeUsers() {
    return q.promise(function(resolve) {
        userController.getAllUsers()
            .then(function(users) {
                return q.all(applyDeleteOnItemRec(users, 0, userController.deleteUserById))
                    .then(function(res) {
                        bar.tick();
                        return res;
                    })
                    .then(resolve);
            });
    });
}

function purgeRoles() {
    return q.promise(function(resolve) {
        roleController.getAllRoles()
            .then(function(roles) {
                return q.all(applyDeleteOnItemRec(roles, 0, roleController.deleteRoleById))
                    .then(function(res) {
                        bar.tick();
                        return res;
                    })
                    .then(resolve);
            });
    });
}

function purgeAttributes() {
    return q.promise(function(resolve) {
        attributeController.getAllAttributes()
            .then(function(attributes) {
                return q.all(applyDeleteOnItemRec(attributes, 0, attributeController.deleteAttributeById))
                    .then(function(res) {
                        bar.tick();
                        return res;
                    })
                    .then(resolve);
            });
    });
}

function purgeSkills() {
    return q.promise(function(resolve) {
        skillController.getAllSkills()
            .then(function(skills) {
                return q.all(applyDeleteOnItemRec(skills, 0, skillController.deleteSkillById))
                    .then(function(res) {
                        bar.tick();
                        return res;
                    })
                    .then(resolve);
            });
    });
}

function purgeOffices() {
    return q.promise(function(resolve) {
        officeController.getAllOffices()
            .then(function(offices) {
                return q.all(applyDeleteOnItemRec(offices, 0, officeController.deleteOfficeById))
                    .then(function(res) {
                        bar.tick();
                        return res;
                    })
                    .then(resolve);
            });
    });
}

function purgeSkillGroups() {
    return q.promise(function(resolve) {
        skillGroupController.getAllSkillGroups()
            .then(function(skillGroups) {
                return q.all(applyDeleteOnItemRec(skillGroups, 0, skillGroupController.deleteSkillGroupById))
                    .then(function(res) {
                        bar.tick();
                        return res;
                    })
                    .then(resolve);
            });
    });
}

function purgeAssignments() {
    return q.promise(function(resolve) {
        assignmentController.getAllAssignments()
            .then(function(assignments) {
                return q.all(applyDeleteOnItemRec(assignments, 0, assignmentController.deleteAssignmentById))
                    .then(function(res) {
                        bar.tick();
                        return res;
                    })
                    .then(resolve);
            });
    });
}

function purgeUserToSkillConnectors() {
    return q.promise(function(resolve) {
        userToSkillConnectorController.getAllUserToSkillConnectors()
            .then(function(userToSkillConnectors) {
                return q.all(applyDeleteOnItemRec(userToSkillConnectors, 0, userToSkillConnectorController.deleteUserToSkillConnectorById))
                    .then(function(res) {
                        bar.tick();
                        return res;
                    })
                    .then(resolve);
            });
    });
}

function purgeRoleToAttributeConnectors() {
    return q.promise(function(resolve) {
        roleToAttributeConnectorController.getAllRoleToAttributeConnectors()
            .then(function(roleToAttributeConnectors) {
                return q.all(applyDeleteOnItemRec(roleToAttributeConnectors, 0, roleToAttributeConnectorController.deleteRoleToAttributeConnectorById))
                    .then(function(res) {
                        bar.tick();
                        return res;
                    })
                    .then(resolve);
            });
    });
}

function purgeSkillToSkillGroupConnectors() {
    return q.promise(function(resolve) {
        skillToSkillGroupConnectorController.getAllSkillToSkillGroupConnectors()
            .then(function(skillToSkillGroupConnectors) {
                return q.all(applyDeleteOnItemRec(skillToSkillGroupConnectors, 0, skillToSkillGroupConnectorController.deleteSkillToSkillGroupConnectorById))
                    .then(function(res) {
                        bar.tick();
                        return res;
                    })
                    .then(resolve);
            });
    });
}

function purgeUserToOfficeConnectors() {
    return q.promise(function(resolve) {
        userToOfficeConnectorController.getAllUserToOfficeConnectors()
            .then(function(userToOfficeConnectors) {
                return q.all(applyDeleteOnItemRec(userToOfficeConnectors, 0, userToOfficeConnectorController.deleteUserToOfficeConnectorById))
                    .then(function(res) {
                        bar.tick();
                        return res;
                    })
                    .then(resolve);
            });
    });
}

function purgeUserToAssignmentConnectors() {
    return q.promise(function(resolve) {
        userToAssignmentConnectorController.getAllUserToAssignmentConnectors()
            .then(function(userToAssignmentConnectors) {
                return q.all(applyDeleteOnItemRec(userToAssignmentConnectors, 0, userToAssignmentConnectorController.deleteUserToAssignmentConnectorById))
                    .then(function(res) {
                        bar.tick();
                        return res;
                    })
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
    added.push(addSkillGroups());
    added.push(addAssignments());
    return q.all(added);
}

function addAllDefault() {
    var added = [];
    added.push(addRoles());
    added.push(addAttributes());
    added.push(addSkillsDefault());
    added.push(addOffices());
    added.push(addSkillGroups());
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

            certificates: [faker.company.catchPhraseNoun()],

            ICEName: faker.name.firstName() + ' ' + faker.name.lastName(),
            ICEPhone: faker.phone.phoneNumberFormat(),

            profileImage: null,
            personalIdNumber: faker.random.uuid,
            sex: randomHandler.generateSex(),
            description: faker.lorem.sentence(),
            personalInterests: randomHandler.getPersonalInterests(),
            foodPreferences: faker.lorem.sentence(),
            shirtSize: randomHandler.getShirtSize(),
            customHeaders: randomHandler.getCustomHeaders(),

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

function addSkillsDefault() {
    var skills = [
    {
        name: 'Java'
    },
    {
        name: 'C'
    }
    ];
    return q.all(applyAddOnItemsRec(skills, 0, skillController.createNewSkill));

}

function addAssignments() {
    var assignments = [];
    for (var i = 0; i < 10; i++) {
        var object = {};
        object.name = faker.internet.domainName();
        assignments.push(object);
    }

    return q.all(applyAddOnItemsRec(assignments, 0, assignmentController.createNewAssignment));

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
        },
        {
            name: 'Malmö'
        },
        {
            name: 'Göteborg'
        },
        {
            name: 'Sarajevo'
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
            name: 'canEditProfile'
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

function addSkillGroups() {
    var skillGroups = [
        {
            name: 'technologies'
        },
        {
            name: 'spokenLanguages'
        }
    ];
    return q.all(applyAddOnItemsRec(skillGroups, 0, skillGroupController.createNewSkillGroup));

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

    promises.push(skillGroupController.getSkillGroupByName('technologies')
        .then(connectSkillGroupAndSkills));

    promises.push(userController.getAllUsers()
        .then(connectUsersAndRandomAssignments));

    return q.all(promises);
}

function addConnectorsDefault() {
    var promises = [];
    promises.push(roleController.getRoleByName('admin')
        .then(connectRoleAndAttributes));

    promises.push(skillGroupController.getSkillGroupByName('technologies')
        .then(connectSkillGroupAndSkills));

    return q.all(promises);
}

function connectUsersAndRandomSkills(users) {
    var extraFields = {
        level: randomHandler.getSkillLevel,
        years: randomHandler.getYears
    };

    return skillController.getAllSkills()
        .then(function(skills) {
            return connectItemsToRandomItems(users, skills, 'userId', 'skillId', 0, userToSkillConnectorController.createUserToSkillConnector, config.DEMO.SKILL_ON_USER_PROBABILITY, extraFields);
        });
}

function connectUsersAndRandomAssignments(users) {
    return assignmentController.getAllAssignments()
        .then(function(assignments) {
            return connectItemsToRandomItems(users, assignments, 'userId', 'assignmentId', 0, userToAssignmentConnectorController.createUserToAssignmentConnector, config.DEMO.USER_ON_ASSIGNMENT_PROBABILITY, null);
        });
}

function connectUsersAndRandomOffice(users) {
    return officeController.getAllOffices()
        .then(function(offices) {
            return connectItemsToRandomItem(users, offices, 'userId', 'officeId', 0, userToOfficeConnectorController.createUserToOfficeConnector);
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

function connectSkillGroupAndSkills(skillGroup) {
    return skillController.getAllSkills()
        .then(function(skills) {
            return q.promise(function(resolve) {
                var promises = [];
                skills.forEach(function(skill) {
                    promises.push(skillToSkillGroupConnectorController.createSkillToSkillGroupConnector({skillId: skill._id, skillGroupId: skillGroup._id}));
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

        bar.tick();
        return applyFunction(items[index])
            .then(function() {
                index++;
                return applyAddOnItemsRec(items, index, applyFunction)
                    .then(resolve);
            });
    });
}

function connectOneToAll(item, connectToItems, itemsProp, connectToItemsProp, index, applyFunction, extraFields) {
    return q.promise(function(resolve) {
        if (index >= connectToItems.length) {
            return resolve(item);
        }

        //create the connector
        var connector = {};
        connector[itemsProp] = item._id;
        connector[connectToItemsProp] = connectToItems[index]._id;

        for (var extraField in extraFields) {
            if (extraFields.hasOwnProperty(extraField)) {
                connector[extraField] = extraFields[extraField].apply();
            }
        }

        //post the connector
        return applyFunction(connector)
            .then(function() {
                index++;
                return connectOneToAll(item, connectToItems, itemsProp, connectToItemsProp, index, applyFunction, extraFields)
                    .then(resolve);
            });
    });
}

function connectItemsToRandomItems(items, connectToItems, itemsProp, connectToItemsProp, index, applyFunction, p, extraFields) {
    return q.promise(function(resolve) {
        if (index >= items.length) {
            return resolve(items);
        }

        var uniqueConnectToItems = randomHandler.getBinomialUniqueList(connectToItems, p);

        return connectOneToAll(items[index], uniqueConnectToItems, itemsProp, connectToItemsProp, 0, applyFunction, extraFields)
            .then(function() {
                bar.tick();
                index++;
                return connectItemsToRandomItems(items, connectToItems, itemsProp, connectToItemsProp, index, applyFunction, p, extraFields)
                    .then(resolve);
            });
    });

}

function connectItemsToRandomItem(items, connectToItems, itemsProp, connectToItemsProp, index, applyFunction) {
    return q.promise(function(resolve) {
        if (index >= items.length) {
            return resolve(items);
        }

        bar.tick();
        var connector = {};
        connector[itemsProp] = items[index]._id;
        connector[connectToItemsProp] = connectToItems[faker.random.number(connectToItems.length - 1)]._id;
        return applyFunction(connector)
            .then(function() {
                index++;
                return connectItemsToRandomItem(items, connectToItems, itemsProp, connectToItemsProp, index, applyFunction)
                    .then(resolve);
            });
    });

}
