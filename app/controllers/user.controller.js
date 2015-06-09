var request = require('request');
var config = require('../config/config');
var userDao = require('../dao/user.dao');
var q = require('q');

var url = config.api_url_dev + 'user';

// TODO: Make the validation more covering
function validateUser(user) {
  var deferred = q.defer();
  if (user && user.name && user.email)
    deferred.resolve(user);
  else
    defered.reject(new Error('Not a valid user object!'));
  return deferred.promise;
};

exports.getUserTemplate = function() {
  return {
    email: null,
    name: null
  };
};

exports.createNewUser = function(userobj) {
  console.log(userobj);
  return validateUser(userobj)
  .then(userDao.createNewUser);
};


exports.getUserByEmail = function(email) {
  return userDao.getUserByEmail(email);
};

exports.getAllUsers = function() {
  return userDao.getAllUsers();
};