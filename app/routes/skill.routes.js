'use strict';

/**
 * Module dependencies.
 */
var skillController = require('../controllers/skill.controller');
var responseHandler = require('../utils/response.handler');

module.exports = function(routes) {

    // create a skill
    routes.post('/', function(request, response) {
        skillController.createNewSkill(request.body)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get skills
    routes.get('/', function(request, response) {
        skillController.getAllSkills()
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // get a skill by the given id
    routes.get('/:id', function(request, response) {
        skillController.getSkillById(request.params.id)
            .then(responseHandler.sendJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    // delete a skill given an id
    routes.delete('/:id', function(request, response) {
        skillController.deleteSkillById(request.params.id)
            .then(responseHandler.sendSuccessfulDeleteJsonResponse(response))
            .catch(responseHandler.sendErrorResponse(response));
    });

    return routes;
};
