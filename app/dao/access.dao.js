var request = require('request');
var q = require('q');
var config = require('../config/config');
var responseParser = require('../utils/response.parser');

var url = config.api_url_dev + 'access';

exports.createAccess = function(access) {
    var options = {
        uri: url,
        method: 'POST',
        json: access
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parsePost);
};

exports.getAccessesByAttributeId = function(id) {
    var options = {
        uri: url + '?attribute_id=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parseGet)
        .then(responseParser.parsePolyQuery);
};

exports.getAccessesByRoleId = function(id) {
    var options = {
        uri: url + '?role_id=' + id,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parseGet)
        .then(responseParser.parsePolyQuery);
};

exports.getAllAccesses = function() {
    var options = {
        uri: url,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parseGet)
        .then(responseParser.parsePolyQuery);
};

exports.deleteAccess = function(accessId) {
    console.log(accessId);
    var options = {
        uri: url + '/' + accessId,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(responseParser.parseResponse)
        .then(responseParser.parseDelete);
};
