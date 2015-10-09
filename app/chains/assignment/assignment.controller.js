'use strict';

var assignmentDao = require('./assignment.dao');
var Promise = require('bluebird');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

// TODO: Make the validation more covering
function validateAssignment(assignment) {
    return new Promise(function(resolve, reject) {
        if (assignment && assignment.name) {
            assignment = utils.extend(getAssignmentTemplate(), assignment);
            return resolve(assignment);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getAssignmentTemplate() {
    return {
        name: null,
        customer: null,
        domain: null
    };
}

exports.createNewAssignment = function(assignmentObject) {
    return validateAssignment(assignmentObject)
        .then(assignmentDao.createNewAssignment);
};

exports.getAssignments = function(query) {
    return assignmentDao.getAssignments(query);
};

exports.getAssignmentById = function(id) {
    return assignmentDao.getAssignmentById(id);
};

exports.deleteAssignmentById = function(id) {
    return assignmentDao.deleteAssignmentById(id);
};

exports.purgeIndices = function() {
    return assignmentDao.purgeIndices();
};

exports.createIndex = function(fields, options) {
    return assignmentDao.createIndex(fields, options);
};

function setAssignmentProperties(body) {
    return function(assignment) {
        utils.extend(assignment, body);
        return assignment;
    };
}

exports.updateAssignment = function(id, body) {
    return exports.getAssignmentById(id)
        .then(setAssignmentProperties(body))
        .then(assignmentDao.updateAssignment);
};
