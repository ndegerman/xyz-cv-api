'use strict';

var server = require('../app/server');
var request = require('supertest');
var expect = require('expect.js');
var nock = require('nock');
var config = require('config');
var msg = require('../app/utils/message.handler');
var url = 'localhost:' + config.PORT;
var mockedUrl = config.API_URL;

describe('/roleToAttributeConnector', function() {

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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when posting a roleToAttributeConnector', function(done) {
        var resultPost = {
            attributeId: '123',
            roleId: '456',
            createdAt: '2015-06-16T10:33:27.803Z',
            updatedAt: '2015-06-16T10:33:27.803Z',
            _id: '557ffb779a81250f00194d60'
        };

        nock(mockedUrl)
            .post('/roleToAttributeConnector', {
                attributeId: '123',
                roleId: '456'
            })
            .reply(200, resultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/roleToAttributeConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                attributeId: '123',
                roleId: '456'
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleToAttributeConnector with no body', function(done) {
        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            attributeId: '123',
            roleId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/roleToAttributeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/roleToAttributeConnector')
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleToAttributeConnector with the field for attribute id empty', function(done) {
        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            attributeId: '123',
            roleId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/roleToAttributeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/roleToAttributeConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                attributeId: '',
                roleId: '123'
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleToAttributeConnector with the field for role id empty', function(done) {

        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            attributeId: '123',
            roleId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/roleToAttributeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/roleToAttributeConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                attributeId: '123',
                roleId: ''
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

    it('should correctly extract the needed properties and reply with HTTP status code 200 and a correctly formatted string when posting a roleToAttributeConnector with too many fields in the body', function(done) {

        var resultPost = {
            attributeId: '123',
            roleId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/roleToAttributeConnector', {
                attributeId: '123',
                roleId: '456'
            })
            .reply(200, resultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/roleToAttributeConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                attributeId: '123',
                roleId: '456',
                id: '789'
            })

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultPost));
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleToAttributeConnector with no attributeId field', function(done) {
        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            attributeId: '123',
            roleId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/roleToAttributeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/roleToAttributeConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                attribut2eId: '123',
                roleId: '456'
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleToAttributeConnector with no roleId field', function(done) {
        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            attributeId: '123',
            roleId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/roleToAttributeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/roleToAttributeConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                attributeId: '123',
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleToAttributeConnector not correctly formatted as Json', function(done) {
        var resultNotJson = msg.INVALID_JSON;

        var badResultPost = {
            name: 'test1',
            createdAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '1234'
        };

        nock(mockedUrl)
            .post('/roleToAttributeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/roleToAttributeConnector')
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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all roleToAttributeConnectors', function(done) {
        var resultAllGet = [{
            _id: '557eb8a89a81250f00194d52',
            attributeId: '557d7cbc9a81250f00194d46',
            roleId: '557eb7199a81250f00194d50',
            createdAt: '2015-06-15T11:36:08.114Z',
            updatedAt: '2015-06-15T11:36:08.114Z'
        }];

        nock(mockedUrl)
            .get('/roleToAttributeConnector')
            .reply(200, resultAllGet)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/roleToAttributeConnector')
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

    //===============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting a roleToAttributeConnector by role id', function(done) {
        var resultGetByRoleId = [{
            _id: '123',
            attributeId: '456',
            roleId: '789',
            createdAt: '2015-06-15T11:36:08.114Z',
            updatedAt: '2015-06-15T11:36:08.114Z'
        }];

        nock(mockedUrl)
            .get('/roleToAttributeConnector?roleId=789')
            .reply(200, resultGetByRoleId)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/roleToAttributeConnector/role/789')
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
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultGetByRoleId));
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting a roleToAttributeConnector by attribute id', function(done) {
        var resultGetByAttributeId = [{
            _id: '123',
            attributeId: '456',
            roleId: '789',
            createdAt: '2015-06-15T11:36:08.114Z',
            updatedAt: '2015-06-15T11:36:08.114Z'
        }];

        nock(mockedUrl)
            .get('/roleToAttributeConnector?attributeId=456')
            .reply(200, resultGetByAttributeId)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/roleToAttributeConnector/attribute/456')
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
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultGetByAttributeId));
                done();
            });
    });

    //==============================================================================

    it('should reply with HTTP status code 404 and a correctly formatted string when getting roleToAttributeConnectors by role id not in the database', function(done) {
        var resultNotInDb = msg.NO_SUCH_ITEM;

        nock(mockedUrl)
            .get('/roleToAttributeConnector?roleId=123')
            .reply(404, resultNotInDb)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/roleToAttributeConnector/role/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultNotInDb);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 404 and a correctly formatted string when getting roleToAttributeConnectors by attribute id not in the database', function(done) {
        var resultNotInDb = msg.NO_SUCH_ITEM;

        nock(mockedUrl)
            .get('/roleToAttributeConnector?attributeId=123')
            .reply(404, resultNotInDb)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/roleToAttributeConnector/attribute/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultNotInDb);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted string when deleting a roleToAttributeConnector by its id', function(done) {
        var resultDelete = msg.SUCCESS_DELETE;

        nock(mockedUrl)
            .delete('/roleToAttributeConnector/123')
            .reply(204, {})

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/roleToAttributeConnector/123')
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
                expect(res.text).to.equal(resultDelete);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 404 and a correctly formatted string when deleting a roleToAttributeConnector not in the database', function(done) {
        var resultRoleNotInDb = msg.NO_SUCH_ITEM;

        nock(mockedUrl)
            .delete('/roleToAttributeConnector/123')
            .reply(404, resultRoleNotInDb)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/roleToAttributeConnector/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultRoleNotInDb);
                done();
            });
    });
});
