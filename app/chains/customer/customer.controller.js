'use strict';

var customerDao = require('./customer.dao');
var Promise = require('bluebird');
var errorHandler = require('../../utils/error.handler');
var utils = require('../../utils/utils');

// TODO: Make the validation more covering
function validateCustomer(customer) {
    return new Promise(function(resolve, reject) {
        if (customer && customer.name) {
            customer = utils.extend(getCustomerTemplate(), customer);
            return resolve(customer);
        }

        return errorHandler.getHttpError(400)
            .then(reject);
    });
}

function getCustomerTemplate() {
    return {
        name: null
    };
}

exports.createNewCustomer = function(customerObject) {
    return validateCustomer(customerObject)
        .then(customerDao.createNewCustomer);
};

exports.getCustomerById = function(id) {
    return customerDao.getCustomerById(id);
};

exports.getCustomers = function(query) {
    return customerDao.getCustomers(query);
};

exports.deleteCustomerById = function(id) {
    return customerDao.deleteCustomerById(id);
};
