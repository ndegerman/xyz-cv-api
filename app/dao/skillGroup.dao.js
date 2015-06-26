'use strict';

var request = require('request');
var config = require('config');
var q = require('q');
var responseHandler = require('../utils/response.handler');

var url = config.API_URL + 'skillGroup';

exports.createNewSkillGroup = function(skillGroup) {
    var options = {
        uri: url,
        method: 'POST',
        json: skillGroup
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parsePost);
};

exports.getSkillGroupByName = function(name) {
    var options = {
        uri: url + '?name=' + name,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parseMonoQuery);
};

exports.getSkillGroupById = function(id) {
    var options = {
        uri: url + '/' + id,
        method: 'GET',
        json: true
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet);
};

exports.getAllSkillGroups = function() {
    var options = {
        uri: url,
        method: 'GET'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseGet)
        .then(responseHandler.parsePolyQuery);
};

exports.deleteSkillGroupById = function(id) {
    var options = {
        uri: url + '/' + id,
        method: 'DELETE'
    };

    return q.nfcall(request, options)
        .then(responseHandler.parseResponse)
        .then(responseHandler.parseDelete);
};
