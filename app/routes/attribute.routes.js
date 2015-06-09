'use strict';

/**
 * Module dependencies.
 */
var attrController = require('../controllers/attribute.controller');
var config = require('../config/config');
var jwt = require('jsonwebtoken');

module.exports = function(routes) {

  // create an attribute
    routes.post('/', function(req, res) {
        attrController.createNewAttr(req.body)
        .then(function(attr) {
            return res.json(attr);
        })
        .catch(function(err) {
            return res.send(err);
        });
    });

  // get attributes
    routes.get('/', function(req, res) {
        attrController.getAllAttrs()
        .then(function(attrs) {
            return res.json(attrs);      
        })
        .catch(function(err) {
            return res.send(err);
        });
    });
    return routes;
};
