var request = require('request');
var config = require('../config/config');
var attrDao = require('../dao/attribute.dao');
var q = require('q');

var url = config.api_url_dev + 'attr';


// TODO: Make the validation more covering
function validateAttr(attr) {
     var deferred = q.defer();
    if (attr && attr.name) {
        deferred.resolve(attr);
    } else {
        defered.reject(new Error('Not a valid attr object!'));
    }
    return deferred.promise;
};


exports.getAttrTemplate = function() {
    return {
        name: null
    };
};

exports.createNewAttr = function(attrobj) {
    return validateAttr(attrobj)
    .then(attrDao.createNewAttr);
};


exports.getAttrByName = function(name) {
    return attrDao.getAttrByName(name);
};

exports.getAllAttrs = function() {
    return attrDao.getAllAttrs();
};