'use strict';

/**
 * Module dependencies.
 */
var skillGroupController = require('../controllers/skillGroup.controller');
var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    // create a skillGroup
    routes.post('/', function(request, response) {
        skillGroupController.createNewSkillGroup(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get skillGroups
    routes.get('/', function(request, response) {
        skillGroupController.getAllSkillGroups()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get a skillGroup by the given id
    routes.get('/:id', function(request, response) {
        skillGroupController.getSkillGroupById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete a skillGroup given an id
    routes.delete('/:id', function(request, response) {
        skillGroupController.deleteSkillGroupById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
