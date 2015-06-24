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

function validateBodyForPut(request) {
    var allowed = [
        'role'
        ];

    var body = request.body;

    return q.promise(function(resolve, reject) {
        for (var field in body) {
            if (allowed.indexOf(field) < 0) {
                return errorHandler.getHttpError(400)
                    .then(reject);
            }
        }

        return resolve(request);
    });
}

exports.getUserTemplate = function(name, email) {
    return {
        email: email,
        name: name,
        role: 'user'
    };
};

function updateUserObject(body) {
    function extend(object, props) {
        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                object[prop] = props[prop];
            }
        }
    }

    return function(user) {
        extend(user, body);
        return user;
    };
}

function getUserByIdFunction(id) {
    return function() {
        return exports.getUserById(id);
    };
}

exports.changeFieldForUser = function(request) {

    //validate request body
    return validateBodyForPut(request)

        //get user to update
        .then(getUserByIdFunction(request.params.id))

        //get current user

        //check if authorized

        //update user object
        .then(updateUserObject(request.body))

        //update user in database
        .then(userDao.changeFieldForUser);
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
