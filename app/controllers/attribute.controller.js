var attributeDao = require('../dao/attribute.dao');
var q = require('q');

// TODO: Make the validation more covering
function validateAttribute(attribute) {
    q.promise(function(resolve, reject) {
        if (attribute && attribute.name) {
            return resolve(attribute);
        }
        return reject(new Error('Not a valid attribute object!'));
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
