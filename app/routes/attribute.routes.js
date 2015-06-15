'use strict';

/**
 * Module dependencies.
 */
var attributeController = require('../controllers/attribute.controller');
var config = require('../config/config');

module.exports = function(routes) {

    // create an attribute
    routes.post('/', function(request, response) {
        attributeController.createNewAttribute(request.body)
            .then(function(attribute) {
                return response.json(attribute);
            })
            .catch(function(error) {
                return response.status(error.status || 500).send(error.message);
            });
    });

    // get attributes
    routes.get('/', function(request, response) {
        attributeController.getAllAttributes()
            .then(function(attributes) {
                return response.json(attributes);
            })
            .catch(function(error) {
                console.log(error);
                return response.status(error.status || 500).send(error.message);
            });
    });
    return routes;
};
