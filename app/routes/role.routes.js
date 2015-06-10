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
                return response.send(error);
            });
    });

    // delete a role given an id
    routes.delete('/:id', function(request, response) {
        roleController.deleteRoleById(request.params.id)
            .then(function() {
                return response.json({ message: 'The role was successfully deleted.' });
            })
            .catch(function(error) {
                return response.send(error);
            });
    });

    // get roles
    routes.get('/', function(request, response) {
        roleController.getAllRoles()
            .then(function(roles) {
                return response.json(roles);      
            })
            .catch(function(error) {
                return response.send(error);
            });
    });

    return routes;
};