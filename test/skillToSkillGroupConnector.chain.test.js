'use strict';

var server = require('../app/server');
var request = require('supertest');
var expect = require('expect.js');
var url = 'http://localhost:9000';
var nock = require('nock');
var config = require('config');
var mockedUrl = config.API_URL;

describe('/api/skillToSkillGroupConnector', function() {

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    var getUserByEmailResponse = [{
        _id:'558bacd8ed289d0f00d2c5f3',
        email:'a@softhouse.se',
        name:'A',
        createdAt:'2015-06-25T07:25:12.523Z',
        updatedAt:'2015-06-25T07:25:12.523Z'
    }];

    //===============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when posting a skillToSkillGroupConnector', function(done) {
        var resultPost = {
            skillId: '123',
            skillGroupId: '456',
            createdAt: '2015-06-16T10:33:27.803Z',
            updatedAt: '2015-06-16T10:33:27.803Z',
            _id: '557ffb779a81250f00194d60'
        };

        nock(mockedUrl)
            .post('/skillToSkillGroupConnector', {
                skillId: '123',
                skillGroupId: '456'
            })
            .reply(200, resultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/api/skillToSkillGroupConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                skillId: '123',
                skillGroupId: '456'
            })

            // end handles the response
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultPost));
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a skillToSkillGroupConnector with no body', function(done) {
        var resultNoArg = 'Invalid JSON object.';

        var badResultPost = {
            skillId: '123',
            skillGroupId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/skillToSkillGroupConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/api/skillToSkillGroupConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultNoArg);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a skillToSkillGroupConnector with the field for skill id empty', function(done) {
        var resultNoArg = 'Invalid JSON object.';

        var badResultPost = {
            skillId: '123',
            skillGroupId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/skillToSkillGroupConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/api/skillToSkillGroupConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                skillId: '',
                skillGroupId: '123'
            })

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultNoArg);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a skillToSkillGroupConnector with the field for skillGroup id empty', function(done) {
        var resultNoArg = 'Invalid JSON object.';

        var badResultPost = {
            skillId: '123',
            skillGroupId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/skillToSkillGroupConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/api/skillToSkillGroupConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                skillId: '123',
                skillGroupId: ''
            })

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultNoArg);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a skillToSkillGroupConnector with too many fields in the body', function(done) {
        var resultNoArg = 'Invalid JSON object.';

        var badResultPost = {
            skillId: '123',
            skillGroupId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/skillToSkillGroupConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/api/skillToSkillGroupConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                skillId: '123',
                skillGroupId: '456',
                id: '789'
            })

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultNoArg);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a skillToSkillGroupConnector with no skillId field', function(done) {
        var resultNoArg = 'Invalid JSON object.';

        var badResultPost = {
            skillId: '123',
            skillGroupId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/skillToSkillGroupConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/api/skillToSkillGroupConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                attribut2eId: '123',
                skillGroupId: '456'
            })

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultNoArg);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a skillToSkillGroupConnector with no skillGroupId field', function(done) {
        var resultNoArg = 'Invalid JSON object.';

        var badResultPost = {
            skillId: '123',
            skillGroupId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/skillToSkillGroupConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/api/skillToSkillGroupConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                skillId: '123',
                rol2eId: '456'
            })

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultNoArg);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a skillToSkillGroupConnector not correctly formatted as Json', function(done) {
        var resultNotJson = 'invalid json';

        var badResultPost = {
            name: 'test1',
            createdAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '1234'
        };

        nock(mockedUrl)
            .post('/skillToSkillGroupConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/api/skillToSkillGroupConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send('name: 1234')

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultNotJson);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all skillToSkillGroupConnectors', function(done) {
        var resultAllGet = [{
            _id: '557eb8a89a81250f00194d52',
            skillId: '557d7cbc9a81250f00194d46',
            skillGroupId: '557eb7199a81250f00194d50',
            createdAt: '2015-06-15T11:36:08.114Z',
            updatedAt: '2015-06-15T11:36:08.114Z'
        }];

        nock(mockedUrl)
            .get('/skillToSkillGroupConnector')
            .reply(200, resultAllGet)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/api/skillToSkillGroupConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultAllGet));
                done();
            });
    });

    //==============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting a skillToSkillGroupConnector by skillGroup id', function(done) {

        var resultGetBySkillGroupId = [{
            _id: '123',
            skillId: '456',
            skillGroupId: '789',
            createdAt: '2015-06-15T11:36:08.114Z',
            updatedAt: '2015-06-15T11:36:08.114Z'
        }];

        nock(mockedUrl)
            .get('/skillToSkillGroupConnector?skillGroupId=789')
            .reply(200, resultGetBySkillGroupId)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/api/skillToSkillGroupConnector/skillGroup/789')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultGetBySkillGroupId));
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting a skillToSkillGroupConnector by skill id', function(done) {
        var resultGetBySkillId = [{
            _id: '123',
            skillId: '456',
            skillGroupId: '789',
            createdAt: '2015-06-15T11:36:08.114Z',
            updatedAt: '2015-06-15T11:36:08.114Z'
        }];

        nock(mockedUrl)
            .get('/skillToSkillGroupConnector?skillId=456')
            .reply(200, resultGetBySkillId)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/api/skillToSkillGroupConnector/skill/456')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultGetBySkillId));
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 404 and a correctly formatted string when getting skillToSkillGroupConnectors by skillGroup id not in the database', function(done) {
        var resultNotInDb = {
            message: 'No item with the given id was found.'
        };

        nock(mockedUrl)
            .get('/skillToSkillGroupConnector?skillGroupId=123')
            .reply(404, resultNotInDb)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/api/skillToSkillGroupConnector/skillGroup/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultNotInDb.message);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 404 and a correctly formatted string when getting skillToSkillGroupConnectors by skill id not in the database', function(done) {
        var resultNotInDb = {
            message: 'No item with the given id was found.'
        };

        nock(mockedUrl)
            .get('/skillToSkillGroupConnector?skillId=123')
            .reply(404, resultNotInDb)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/api/skillToSkillGroupConnector/skill/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultNotInDb.message);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted string when deleting a skillToSkillGroupConnector by its id', function(done) {
        var resultDelete = {
            message: 'The item was successfully removed.'
        };

        nock(mockedUrl)
            .delete('/skillToSkillGroupConnector/123')
            .reply(204, {})

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/api/skillToSkillGroupConnector/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultDelete));
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 404 and a correctly formatted string when deleting a skillToSkillGroupConnector not in the database', function(done) {
        var resultSkillGroupNotInDb = 'No item with the given id was found.';

        nock(mockedUrl)
            .delete('/skillToSkillGroupConnector/123')
            .reply(404, resultSkillGroupNotInDb)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/api/skillToSkillGroupConnector/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultSkillGroupNotInDb);
                done();
            });
    });
});
