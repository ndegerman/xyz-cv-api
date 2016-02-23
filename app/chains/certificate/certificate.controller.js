'use strict';

var certificateDao = require('./certificate.dao');
var Promise = require('bluebird');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

// TODO: Make the validation more covering
function validateCertificate(certificate) {
    return new Promise(function(resolve, reject) {
        if (certificate && certificate.name) {
            certificate = utils.extend(getCertificateTemplate(), certificate);
            return resolve(certificate);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getCertificateTemplate() {
    return {
        name: null,
        customer: null,
        domain: null
    };
}

exports.createNewCertificate = function(certificateObject) {
    return validateCertificate(certificateObject)
        .then(certificateDao.createNewCertificate);
};

exports.getCertificates = function(query) {
    return certificateDao.getCertificates(query);
};

exports.getCertificateById = function(id) {
    return certificateDao.getCertificateById(id);
};

exports.deleteCertificateById = function(id) {
    return certificateDao.deleteCertificateById(id);
};

exports.purgeIndices = function() {
    return certificateDao.purgeIndices();
};

exports.createIndex = function(fields, options) {
    return certificateDao.createIndex(fields, options);
};

function setCertificateProperties(body) {
    return function(certificate) {
        utils.extend(certificate, body);
        return certificate;
    };
}

exports.updateCertificate = function(id, body) {
    return exports.getCertificateById(id)
        .then(setCertificateProperties(body))
        .then(certificateDao.updateCertificate);
};
