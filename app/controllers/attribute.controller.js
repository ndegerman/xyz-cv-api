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
    })
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

exports.getAttributeByName = function(name) {
    return attributeDao.getAttributeByName(name);
};

exports.getAllAttributes = function() {
    return attributeDao.getAllAttributes();
};
