'use strict';

var userDao = require('../dao/user.dao');
var q = require('q');
var errorHandler = require('../utils/error.handler');

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

exports.getUserTemplate = function(name, email) {
    return {
        email: email,
        name: name,
        role: 'user'
    };
};

function validateBodyForPut(request) {
    return q.promise(function(resolve, reject) {
        if (request.body.role) {
            return resolve(request);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

exports.changeRoleForUser = function(request) {
    return validateBodyForPut(request)
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
                    return exports.createNewUser(exports.getUserTemplate(name, email));
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
