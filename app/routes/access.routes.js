'use strict';

/**
 * Module dependencies.
 */
var accessController = require('../controllers/access.controller');
var roleController = require('../controllers/role.controller');
var config = require('../config/config');

module.exports = function(routes) {

    // create an access
    routes.post('/', function(request, response) {
        accessController.createNewAccess(request.body)
            .then(function(access) {
                return response.json(access);
            })
            .catch(function(error) {
                return response.send(error);
            });
    });

    // get all accesses
    routes.get('/', function(request, response) {
        accessController.getAllAccesses()
            .then(function(accesses) {
                return response.json(accesses);      
            })
            .catch(function(error) {
                return response.send(error);
            });
    });

    // get accesses for role 
    routes.get('/role/:id', function(request, response) {

        accessController.getAccessesForRole()
            .then(function(accesses) {
                return response.json(accesses);      
            })
            .catch(function(error) {
                return response.send(error);
            });
    });

    return routes;
};
