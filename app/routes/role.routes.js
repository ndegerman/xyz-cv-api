'use strict';

/**
 * Module dependencies.
 */
var roleController = require('../controllers/role.controller');
var config = require('../config/config');

module.exports = function(routes) {

    // create a role
    routes.post('/', function(request, response) {
        roleController.createNewRole(request.body)
            .then(function(role) {
                return response.json(role);
            })
            .catch(function(error) {
                return response.status(error.status || 500).send(error.message);
            });
    });

    // get roles
    routes.get('/', function(request, response) {
        roleController.getAllRoles()
            .then(function(roles) {
                return response.json(roles);
            })
            .catch(function(error) {
                console.log(error);
                return response.status(error.status || 500).send(error.message);
            });
    });

    // get role by the given id
    routes.get('/:id', function(request, response) {
        roleController.getRoleById(request.params.id)
            .then(function(role) {
                return response.json(role);
            })
            .catch(function(error) {
                return response.status(error.status || 500).send(error.message);
            });
    });

    // delete a role given an id
    routes.delete('/:id', function(request, response) {
        roleController.deleteRoleById(request.params.id)
            .then(function() {
                return response.json({ message: 'The role was successfully deleted.' });
            })
            .catch(function(error) {
                return response.status(error.status || 500).send(error.message);
            });
    });

    return routes;
};
