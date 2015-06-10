'use strict';

/**
 * Module dependencies.
 */
var attributeController = require('../controllers/attribute.controller');
var config = require('../config/config');
var jwt = require('jsonwebtoken');

module.exports = function(routes) {

  // create an attribute
    routes.post('/', function(request, response) {
        attributeController.createNewAttribute(request.body)
            .then(function(attribute) {
                return response.json(attribute);
            })
            .catch(function(error) {
                return response.send(error);
            });
    });

  // get attributes
    routes.get('/', function(request, response) {
        attributeController.getAllAttributes()
            .then(function(attributes) {
                return response.json(attributes);      
            })
            .catch(function(error) {
                return response.send(error);
            });
    });
    return routes;
};
