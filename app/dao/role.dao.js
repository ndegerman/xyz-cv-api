'use strict';

var request = require('request');
var config = require('../config/config');
var q = require('q');

var url = config.api_url_dev + 'role';

function parsePolyQuery(body) {
    return q.promise(function(resolve) {
        var roles = JSON.parse(body) || [];
        return resolve(roles);
    });
}

function parseMonoQuery(body) {
    return q.promise(function(resolve) {
        parsePolyQuery(body)
            .then(function(roles) {
                var role = (roles.length > 0) ? roles[0] : null;
                return resolve(role);
            });
    });
}

// res[0]: the response
// res[1]: the body
// res[2]: the error
function parseResponse(response) {
    return q.promise(function(resolve, reject) {
        if (!response) {
            return reject(new Error('Invalid response format'));
        }
        if (response[2]) {
            return reject(response[2]);
        }
        return resolve(response);
    });
}

function parseDelete(response) {
    return q.promise(function(resolve, reject) {
        switch (response[0].statusCode) {
            case 204:
                return resolve(response[1]);
            case 404:
                return reject(new Error('No item with the given id was found.'));
            case 500:
                return reject(new Error('The item could not be removed.'));
            default:
                return reject(new Error('Not a valid response code.'));
        }
    });
}

function parsePost(response) {
    return q.promise(function(resolve, reject) {
        switch(response[0].statusCode) {
            case 200:
                return resolve(response[1]);
            case 400:
                return reject(new Error('The JSON object in the request was omitted.'));
            case 500:
                return reject(new Error('The item could not be saved.'));
            default:
                return reject(new Error('Not a valid response code.'));
        }
    });
}

function parsePut(response) {
    return q.promise(function(resolve, reject) {
        switch(response[0].statusCode) {
            case 204:
                return resolve(response[1]);
            case 400:
                return reject(new Error('The JSON object in the request was omitted.'));
            case 500:
                return reject(new Error('The item could not be saved.'));
            default:
                return reject(new Error('Not a valid response code.'));
        }
    });
}

function parseGet(response) {
    return q.promise(function(resolve, reject) {
        switch(response[0].statusCode) {
            case 200:
                return resolve(response[1]);
            case 404:
                return reject(new Error('No item with the given id was found.'));
            case 500:
                return reject(new Error('The item/items could not be fetched.'));
            default:
                return reject(new Error('Not a valid response code.'));
        }
    });
}

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

exports.deleteRoleById = function(id) {
    var options = {
        uri: url + '/' + id,
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
        .then(parseMonoQuery);
};

exports.getRoleById = function(id) {
    var options = {
        uri: url + '/' + id,
        method: 'GET',
        json: true
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(function(value) {
            console.log(value);
        })
        .then(parseGet);
};

exports.getAllRoles = function() {
    var options = {
        uri: url,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(parseResponse)
        .then(parseGet)
        .then(parsePolyQuery);
};
