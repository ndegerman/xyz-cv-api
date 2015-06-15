var userDao = require('../dao/user.dao');
var q = require('q');

// TODO: Make the validation more covering
function validateUser(user) {
    q.promise(function(resolve, reject) {
        if (user && user.name && user.email) {
            return resolve(user);
        }
        return reject(new Error('Not a valid user object!'));
    });
}

exports.getUserTemplate = function() {
    return {
        email: null,
        name: null
    };
};

exports.createNewUser = function(userObject) {
    return validateUser(userObject)
        .then(userDao.createNewUser);
};

exports.getUserByEmail = function(email) {
    return userDao.getUserByEmail(email);
};

exports.getAllUsers = function() {
    return userDao.getAllUsers();
};
