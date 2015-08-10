'use strict';

var userDao = require('./user.dao');
var Promise = require('bluebird');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

// TODO: Make the validation more covering
function validateUser(user) {
    return new Promise(function(resolve, reject) {
        if (user && user.name && user.email && user.role) {
            user = utils.extend(getUserTemplate(), user);
            return resolve(user);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getUserTemplate(name, email) {
    name = name === undefined ? name : name.replace('xx.','').replace('.', ' ');
    return {
        email: email,
        name: name,
        role: 'user',
        hidden: false,

        phoneNumber: null,
        employeeNumber: null,
        position: null,
        closestSuperior: null,
        startDateOfEmployment: null,
        endDateOfEmployment: null,

        certificates: [],

        ICEName: null,
        ICEPhone: null,

        profileImage: null,
        personalIdNumber: null,
        sex: null,
        description: null,
        personalInterests: [],
        foodPreferences: null,
        shirtSize: null,
        customHeaders: [],

        linkedin: null,
        facebook: null,
        twitter: null,
        country: null,
        address: null,
        city: null,
        ZIP: null
    };
}

function setUserProperties(body) {
    return function(user) {
        utils.extend(user, body);
        return user;
    };
}

exports.updateUser = function(id, body, email) {
    return exports.getUserById(id)
        .then(setUserProperties(body))
        .then(userDao.updateUser);
};

exports.getUserById = function(id) {
    return userDao.getUserById(id);
};

exports.createNewUser = function(user) {
    return validateUser(user)
        .then(userDao.createNewUser);
};

exports.createUserIfNonexistent = function(name, email) {
    return new Promise(function(resolve) {
        return exports.getUsers({email: email})
            .then(function(users) {
                return new Promise(function(resolve) {
                    if (users[0]) {
                        return resolve(users[0]);
                    } else {
                        exports.createNewUser(getUserTemplate(name, email))
                            .then(resolve);
                    }
                })
            }).then(resolve);
    });
};

exports.getUsers = function(query) {
    return userDao.getUsers(query);
};

exports.deleteUserById = function(id) {
    return userDao.deleteUserById(id);
};
