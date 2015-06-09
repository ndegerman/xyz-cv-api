var request = require('request');
var config = require('../config/config');
var attrDao = require('../dao/attribute.dao');
var q = require('q');

var url = config.api_url_dev + 'attr';

// TODO: Make the validation more covering
function validateAttr(attr, next) {
    return next(attr && attr.name);
};

exports.getAttrTemplate = function() {
    return {
        name: null
    };
};

exports.createNewAttr = function(attrobj, next) {
    validateAttr(attrobj, function(valid) {
        if (!valid) {
            return next(new Error('Not a valid attr object!'));
        }

        attrDao.createNewAttr(attrobj, function(err, attr) {
            if (err) {
                return next(err);
            }

           if (!attr) {
                return next(new Error('No attr was returned from the call.'))
            }
            return next(null, attr);
        });
    });
};


exports.getAttrByName = function(name, next) {
    attrDao.getAttrByName(email, function(err, attr) {
        if (err) {
            return next(err);
        }
        return next(null, attr);
    });
};

exports.getAllAttrs = function(next) {
    attrDao.getAllAttrs(function(err, attrs) {
        if (err) {
            return next(err);
        }
        return next(attrs);
    });
};