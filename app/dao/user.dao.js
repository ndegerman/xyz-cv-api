'use strict';

var request = require('request');
var q = require('q');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');
var errorHandler = require('../utils/error.handler');

var url = config.API_URL_DEV + 'user';

exports.createNewUser = function(user) {
    var options = {
        uri: url,
        method: 'POST',
        json: user
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parsePost);
};

exports.changeRoleForUser = function(user) {
    var options = {
        uri: url + '/' + user._id,
        method: 'PUT',
        json: user
    };

    return q.nfcall(request, options)
        .then(responseHandler.parsePut);
};

exports.directToChangeFunction = function(body) {
    return function(user) {
        if (body.role) {
            user.role = body.role;
            return exports.changeRoleForUser(user);
        } else {
            return errorHandler.getHttpError(400);
        }
    };
};

exports.updateUser = function(requested) {

    //get current user
    //exports.getUserByEmail(requested.rawHeaders[17])

    //get user to update
    return exports.getUserById(requested.params.id)

    //check if authorized
     //   .then(checkIfUserIsAuthorized)

    //update user in database
        .then(exports.directToChangeFunction(requested.body));
};

exports.getUserById = function(id) {
    var options = {
        uri: url + '/' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parseNotListMonoQuery);
};

exports.getUserByEmail = function(email) {
    var options = {
        uri: url + '?email=' + email,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parseMonoQuery);
};

exports.getAllUsers = function() {
    var options = {
        uri: url,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.deleteUserById = function(id) {
    var options = {
        uri: url + '/' + id,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseDelete);
};
