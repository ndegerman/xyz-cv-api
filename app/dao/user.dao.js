var request = require('request');
var q = require('q');
var config = require('../config/config');
var responseParser = require('../utils/response.parser');

var url = config.api_url_dev + 'user';

exports.createNewUser = function(user) {
    var options = {
        uri: url,
        method: 'POST',
        json: user
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parsePost);
};

exports.getUserByEmail = function(email) {
    var options = {
        uri: url + '?email=' + email,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parseGet)
        .then(responseParser.parseMonoQuery);
};

exports.getAllUsers = function() {
    var options = {
        uri: url,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parseGet)
        .then(responseParser.parseMonoQuery);
};
