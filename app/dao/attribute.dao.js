var request = require('request');
var q = require('q');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

var url = config.api_url_dev + 'attribute';

exports.createNewAttribute = function(attribute) {
    var options = {
        uri: url,
        method: 'POST',
        json: attribute
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parsePost);
};

exports.getAttributeByName = function(name) {
    var options = {
        uri: url + '?name=' + name,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parseMonoQuery);
};

exports.getAllAttributes = function() {
    var options = {
        uri: url,
        method: 'GET',
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};
