'use strict';

var attributeDao = require('../dao/attribute.dao');
var q = require('q');
var errorHandler = require('../utils/error.handler');

// TODO: Make the validation more covering
function validateAttribute(attribute) {
    return q.promise(function(resolve, reject) {
        if (attribute && attribute.name) {
            return resolve(attribute);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

exports.getAttributeTemplate = function() {
    return {
        name: null
    };
};

exports.createNewAttribute = function(attributeObject) {
    return validateAttribute(attributeObject)
        .then(attributeDao.createNewAttribute);
};

exports.getAttributeById = function(id) {
    return attributeDao.getAttributeById(id);
};

exports.getAttributeByName = function(name) {
    return attributeDao.getAttributeByName(name);
};

exports.getAllAttributes = function() {
    return attributeDao.getAllAttributes();
};

exports.deleteAttributeById = function(id) {
    return attributeDao.deleteAttributeById(id);
};
