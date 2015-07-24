'use strict';

/**
 * Module dependencies.
 */
var q = require('q');
var NodeCache = require('node-cache');

// Cache
var userRoleCache = new NodeCache({stdTTL: 500});
var roleAttributesCache = new NodeCache({stdTTL: 500});

exports.setToUserRoleCache = function(email, role) {
    return userRoleCache.set(email, role);
};

exports.setToRoleAttributesCache = function(role, attributes) {
    return roleAttributesCache.set(role, attributes);
};

exports.getFromUserRoleCache = function(email) {
    return userRoleCache.get(email);
};

exports.getFromRoleAttributesCache = function(role) {
    return roleAttributesCache.get(role);
};

exports.clearUserRoleCache = function() {
    return userRoleCache.flushAll();
};

exports.clearRoleAttributesCache = function() {
    return roleAttributesCache.flushAll();
};
