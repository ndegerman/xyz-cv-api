var request = require('request');
var config = require('../config/config');
var q = require('q');

var url = config.api_url_dev + 'attr';

function parseAll(body) {
    var deferred = q.defer();
    var attrs = JSON.parse(body);
    if (attrs) {
        deferred.resolve(attrs);
    }
    deferred.resolve([]);
    return deferred.promise;
};

function parseOne(body) {
    var deferred = q.defer();
    parseAll(body)
    .then(function(attrs) {
        if (attrs.length) {
            deferred.resolve(attrs);
        }
        deferred.resolve(null);
    });
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

exports.createNewAttr = function(attr) {
    var options = {
        uri: url,
        method: 'POST',
        json: attr
    };

    return q.nfcall(request, options)
    .then(parseResponse);
};


exports.getAttrByName = function(name) {
    var options = {
        uri: url + '?name=' + name,
        method: 'GET',
    };

    return q.nfcall(request, options)
    .then(parseResponse)
    .then(parseOne);
};

exports.getAllAttrs = function() {
    var options = {
        uri: url,
        method: 'GET',
    };

    return q.nfcall(request, options)
    .then(parseResponse)
    .then(parseAll);
};

