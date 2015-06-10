var request = require('request');
var config = require('../config/config');
var q = require('q');

var url = config.api_url_dev + 'role';

function parseAll(body) {
    var deferred = q.defer();
    var roles = JSON.parse(body);
    if (roles) {
        deferred.resolve(roles);
    }
    deferred.resolve([]);
    return deferred.promise;
};

function parseOne(body) {
    var deferred = q.defer();
    parseAll(body)
        .then(function(roles) {
            if (roles.length) {
                deferred.resolve(roles);
            }
            deferred.resolve(null);
        });
};

// res[0]: the response
// res[1]: the body
// res[2]: the error
function parseResponse(response) {
    return q.promise(function(resolve, reject) {
        if (!response) {
            reject(new Error('Invalid response format'));
        }
        if (response[2]) {
            reject(response[2]);
        }
        resolve(response);
    });
};

function parseDelete(response) {
    return q.promise(function(resolve, reject) {
        switch (response[0].statusCode) {
            case 204:
                resolve(response[1]);
                break;
            case 404:
                reject(new Error('No item with the given id was found.'));
            case 500:
                reject(new Error('The item could not be removed.'));
                break;
            default:
                reject(new Error('Not a valid response code.'));
        };
    });
};

function parsePost(response) {
    return q.promise(function(resolve, reject) {
        switch(response[0].statusCode) {
            case 200:
                resolve(response[1]);
                break;
            case 400:
                reject(new Error('The JSON object in the request was omitted.'));
            case 500:
                reject(new Error('The item could not be saved.'));
                break;
            default:
                reject(new Error('Not a valid response code.'));    
        }
    });
};

function parsePut(response) {
    return q.promise(function(resolve, reject) {
        switch(response[0].statusCode) {
            case 204:
                resolve(response[1]);
                break;
            case 400:
                reject(new Error('The JSON object in the request was omitted.'));
            case 500:
                reject(new Error('The item could not be saved.'));
                break;
            default:
                reject(new Error('Not a valid response code.'));    
        }
    });
};

function parseGet(response) {
    return q.promise(function(resolve, reject) {
        switch(response[0].statusCode) {
            case 200:
                resolve(response[1]);
                break;
            case 404:
                reject(new Error('No item with the given id was found.'));
            case 500:
                reject(new Error('The item/items could not be fetched.'));
                break;
            default:
                reject(new Error('Not a valid response code.'));    
        }
    });
};

exports.createNewRole = function(role) {
    var options = {
        uri: url,
        method: 'POST',
        json: role
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parsePost);
};

exports.deleteRole = function(roleId) {
    var options = {
        uri: url + '/' + roleId,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseDelete);
};


exports.getRoleByName = function(name) {
    var options = {
        uri: url + '?name=' + name,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseGet)
        .then(parseOne);
};

exports.getAllRoles = function() {
    var options = {
        uri: url,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseGet)
        .then(parseAll);
};

