'use strict';

var userDao = require('./user.dao');
var q = require('q');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

// TODO: Make the validation more covering
function validateUser(user) {
    return q.promise(function(resolve, reject) {
        if (user && user.name && user.email && user.role) {
            return resolve(user);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getUserTemplate(name, email) {
    return {
        email: email,
        name: name,
        role: 'user',

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
    return exports.getUserByEmail(email)
        .then(function(user) {
            return q.promise(function(resolve, reject) {
                if (!user) {
                    exports.createNewUser(getUserTemplate(name, email))
                    .then(resolve);
                } else {
                    return resolve(user);
                }
            });
        });
};

exports.getUserByEmail = function(email) {
    return userDao.getUserByEmail(email);
};

exports.getAllUsers = function() {
    return userDao.getAllUsers();
};

exports.deleteUserById = function(id) {
    return userDao.deleteUserById(id);
};
