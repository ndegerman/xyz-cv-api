var request = require('request');
var config = require('../config/config');
var attributeDao = require('../dao/attribute.dao');
var q = require('q');


// TODO: Make the validation more covering
function validateAttribute(attribute) {
    var deferred = q.defer();
    if (attribute && attribute.name) {
        deferred.resolve(attribute);
    } else {
        defered.reject(new Error('Not a valid attribute object!'));
    }
    return deferred.promise;
};


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