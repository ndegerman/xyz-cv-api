var request = require('request');
var config = require('../config/config');
var q = require('q');

var url = config.api_url_dev + 'user';

function parseUsers(body) {
    var deferred = q.defer();
    var users = JSON.parse(body);
     if (!users) {
        users = [];
    }
    deferred.resolve(users);
    return deferred.promise;
};

function parseUser(body) {
    var deferred = q.defer();
    parseUsers(body)
    .then(function(users) {
        var user = null;
        if (users.length) {
            user = users[0]
        }
        deferred.resolve(user);
    });
    return deferred.promise;
};

// res[0]: the response
// res[1]: the body
// res[2]: the error
function parseResponse(res) {
    var deferred = q.defer();
    if (!res) {
        deferred.reject(new Error('Invalid response format'));
    }
    if (res[2]) {
        deferred.reject(res[2]);
    }
    deferred.resolve(res[1]);
    return deferred.promise;
};

exports.createNewUser = function(user) {
    var options = {
        uri: url,
        method: 'POST',
        json: user
    };

    return q.nfcall(request, options)
    .then(parseResponse);
};


exports.getUserByEmail = function(email) {
    var options = {
        uri: url + '?email=' + email,
        method: 'GET',
    };

    return q.nfcall(request, options)
    .then(parseResponse)
    .then(parseUser);
};


exports.getAllUsers = function() {
    var options = {
        uri: url,
        method: 'GET',
    };

    return q.nfcall(request, options)
    .then(parseResponse)
    .then(parseUsers);
};

