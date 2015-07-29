'use strict';

var attributeDao = require('./attribute.dao');
var Promise = require('bluebird');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

// TODO: Make the validation more covering
function validateAttribute(attribute) {
    return new Promise(function(resolve, reject) {
        if (attribute && attribute.name) {
            attribute = utils.extend(getAttributeTemplate(), attribute);
            return resolve(attribute);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getAttributeTemplate() {
    return {
        name: null,
        hiddenFields: null
    };
}

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
