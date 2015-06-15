'use strict';

/**
 * Module dependencies.
 */
var accessController = require('../controllers/access.controller');
var config = require('../config/config');
var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    // create an access
    routes.post('/', function(request, response) {
        accessController.createAccess(request.body)
            .then(response.json.bind(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get all accesses
    routes.get('/', function(request, response) {
        accessController.getAllAccesses()
            .then(response.json.bind(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete the access with the given id
    routes.delete('/:id', function(request, response) {
        accessController.deleteAccessById(request.params.id)
            .then(function() {
                return response.json({ message: 'The access was successfully removed.' });
            })
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get accesses for role
    routes.get('/role/:id', function(request, response) {
        accessController.getAccessesByRoleId(request.params.id)
            .then(response.json.bind(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get accesses for attribute
    routes.get('/attribute/:id', function(request, response) {
        accessController.getAccessesByAttributeId(request.params.id)
            .then(response.json.bind(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete accesses containing the given role id
    routes.delete('/role/:id', function(request, response) {
        accessController.deleteAccessesByRoleId(request.params.id)
            .then(function() {
                return response.json({ message: 'The accesses were successfully removed.' });
            })
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete accesses containing the given attribute id
    routes.delete('/attribute/:id', function(request, response) {
        accessController.deleteAccessesByAttributeId(request.params.id)
            .then(function() {
                return response.json({ message: 'The accesses were successfully removed.' });
            })
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
