'use strict';

/**
 * Module dependencies.
 */
var accessController = require('../controllers/access.controller');
var config = require('../config/config');

module.exports = function(routes) {

    // create an access
    routes.post('/', function(request, response) {
        accessController.createAccess(request.body)
            .then(function(access) {
                return response.json(access);
            })
            .catch(function(error) {
                console.log(error);
                return response.status(error.status || 500).send(error.message);
            });
    });

    // get all accesses
    routes.get('/', function(request, response) {
        accessController.getAllAccesses()
            .then(function(accesses) {
                return response.json(accesses);
            })
            .catch(function(error) {
                return response.status(error.status || 500).send(error.message);
            });
    });

    // delete the access with the given id
    routes.delete('/:id', function(request, response) {
        accessController.deleteAccessById(request.params.id)
            .then(function() {
                return response.json({ message: 'The access was successfully removed.' });
            })
            .catch(function(error) {
                return response.status(error.status || 500).send(error.message);
            });
    });

    // get accesses for role
    routes.get('/role/:id', function(request, response) {
        accessController.getAccessesByRoleId(request.params.id)
            .then(function(accesses) {
                return response.json(accesses);
            })
            .catch(function(error) {
                return response.status(error.status || 500).send(error.message);
            });
    });

    // get accesses for attribute
    routes.get('/attribute/:id', function(request, response) {
        accessController.getAccessesByAttributeId(request.params.id)
            .then(function(accesses) {
                return response.json(accesses);
            })
            .catch(function(error) {
                return response.status(error.status || 500).send(error.message);
            });
    });

    // delete accesses containing the given role id
    routes.delete('/role/:id', function(request, response) {
        accessController.deleteAccessesByRoleId(request.params.id)
            .then(function() {
                return response.json({ message: 'The accesses were successfully removed.' });
            })
            .catch(function(error) {
                console.log(error);
                return response.status(error.status || 500).send(error.message);
            });
    });

    // delete accesses containing the given attribute id
    routes.delete('/attribute/:id', function(request, response) {
        accessController.deleteAccessesByAttributeId(request.params.id)
            .then(function() {
                return response.json({ message: 'The accesses were successfully removed.' });
            })
            .catch(function(error) {
                return response.status(error.status || 500).send(error.message);
            });
    });

    return routes;
};
