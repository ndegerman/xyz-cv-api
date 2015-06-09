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
        attrController.createNewAttr(req.body, function(err, data) {
            if (err) {
                return res.send(err);
            }
            return res.json(data)
        });
    });

  // get attributes
    routes.get('/', function(req, res) {
        attrController.getAllAttrs(function(err, attrs) {
            if (err) {
                return res.send(err);
            }
            return res.json(attrs);
        });
    });

    return routes;
};
