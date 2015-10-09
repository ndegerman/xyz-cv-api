'use strict';

var domainDao = require('./domain.dao');
var Promise = require('bluebird');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

// TODO: Make the validation more covering
function validateDomain(domain) {
    return new Promise(function(resolve, reject) {
        if (domain && domain.name) {
            domain = utils.extend(getDomainTemplate(), domain);
            return resolve(domain);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getDomainTemplate() {
    return {
        name: null
    };
}

exports.createNewDomain = function(domainObject) {
    return validateDomain(domainObject)
        .then(domainDao.createNewDomain);
};

exports.getDomainById = function(id) {
    return domainDao.getDomainById(id);
};

exports.getDomains = function(query) {
    return domainDao.getDomains(query);
};

exports.deleteDomainById = function(id) {
    return domainDao.deleteDomainById(id);
};
