'use strict';

/**
 * Module dependencies.
 */
var accessController = require('../controllers/access.controller');
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
        accessController.getAccessesByRoleId(request.params.id)
            .then(function(accesses) {
                return response.json(accesses);      
            })
            .catch(function(error) {
                return response.send(error);
            });
    });

    // get accesses for attribute 
    routes.get('/attribute/:id', function(request, response) {
        accessController.getAccessesByAttributeId(request.params.id)
            .then(function(accesses) {
                return response.json(accesses);      
            })
            .catch(function(error) {
                return response.send(error);
            });
    });

    // delete accesses containing the given role id
    routes.delete('/role/:id', function(request, response) {
        accessController.deleteAccessesByRoleId(request.params.id)
            .then(function() {
                return response.json({ message: 'The accesses were successfully removed.' });
            })
            .catch(function(error) {
                return response.send(error);
            });
    });

    // delete accesses containing the given attribute id
    routes.delete('/attribute/:id', function(request, response) {
        accessController.deleteAccessesByAttributeId(request.params.id)
            .then(function() {
                return response.json({ message: 'The accesses were successfully removed.' });
            })
            .catch(function(error) {
                return response.send(error);
            });
    });

    return routes;
};