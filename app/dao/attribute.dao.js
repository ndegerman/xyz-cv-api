var request = require('request');
var config = require('../config/config');
var q = require('q');

var url = config.api_url_dev + 'attribute';

function parseAll(body) {
    var deferred = q.defer();
    var attributes = JSON.parse(body);
    if (attributes) {
        deferred.resolve(attributes);
    }
    deferred.resolve([]);
    return deferred.promise;
};

function parseOne(body) {
    var deferred = q.defer();
    parseAll(body)
        .then(function(attributes) {
            if (attributes.length) {
                deferred.resolve(attributes);
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

exports.createNewAttribute = function(attribute) {
    var options = {
        uri: url,
        method: 'POST',
        json: attribute
    };

    return q.nfcall(request, options)
        .then(parseResponse);
};

exports.getAttributeByName = function(name) {
    var options = {
        uri: url + '?name=' + name,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseOne);
};

exports.getAllAttributes = function() {
    var options = {
        uri: url,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseAll);
};
