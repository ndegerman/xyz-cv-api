var request = require('request');
var config = require('../config/config');
var q = require('q');

var url = config.api_url_dev + 'access';

function parseAll(body) {
    var deferred = q.defer();
    var access = JSON.parse(body);
    if (access) {
        deferred.resolve(accesss);
    }
    deferred.resolve([]);
    return deferred.promise;
};

function parseOne(body) {
    var deferred = q.defer();
    parseAll(body)
        .then(function(accesss) {
            if (accesss.length) {
                deferred.resolve(accesss);
            }
            deferred.resolve(null);
        });
};

// res[0]: the response
// res[1]: the body
// res[2]: the error
function parseResponse(response) {
    var deferred = q.defer();
    if (!response) {
        deferred.reject(new Error('Invalid response format'));
    }
    if (response[2]) {
        deferred.reject(response[2]);
    }
    deferred.resolve(response[1]);
    return deferred.promise;
};

exports.createNewAccess = function(access) {
    var options = {
        uri: url,
        method: 'POST',
        json: access
    };

    return q.nfcall(request, options)
        .then(parseResponse);
};


exports.getAccessesByAttributeId = function(id) {
    var options = {
        uri: url + '?attribute_id=' + id,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseAll);
};

exports.getAccessesByUserId = function(id) {
    var options = {
        uri: url + '?user_id=' + id,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseAll);
};

exports.getAllAccesses = function() {
    var options = {
        uri: url,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseAll);
};

