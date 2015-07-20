'use strict';

var assignmentDao = require('./assignment.dao');
var q = require('q');
var errorHandler = require('../../utils/error.handler');

// TODO: Make the validation more covering
function validateAssignment(assignment) {
    return q.promise(function(resolve, reject) {
        if (assignment && assignment.name) {
            return resolve(assignment);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

exports.getAssignmentTemplate = function() {
    return {
        name: null
    };
};

exports.createNewAssignment = function(assignmentObject) {
    return validateAssignment(assignmentObject)
        .then(assignmentDao.createNewAssignment);
};

exports.getAssignmentByName = function(name) {
    return assignmentDao.getAssignmentByName(name);
};

exports.getAssignmentById = function(id) {
    return assignmentDao.getAssignmentById(id);
};

exports.getAllAssignments = function() {
    return assignmentDao.getAllAssignments();
};

exports.deleteAssignmentById = function(id) {
    return assignmentDao.deleteAssignmentById(id);
};
