'use strict';

var server = require('../app/server');
var request = require('supertest');
var expect = require('expect.js');
var nock = require('nock');
var config = require('config');
var msg = require('../app/utils/message.handler');
var url = 'localhost:' + config.PORT;
var mockedUrl = config.API_URL;

describe('/userToOfficeConnector', function() {

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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when posting a userToOfficeConnector', function(done) {
        var resultPost = {
            officeId: '123',
            userId: '456',
            createdAt: '2015-06-16T10:33:27.803Z',
            updatedAt: '2015-06-16T10:33:27.803Z',
            _id: '557ffb779a81250f00194d60'
        };

        nock(mockedUrl)
            .post('/userToOfficeConnector', {
                officeId: '123',
                userId: '456'
            })
            .reply(200, resultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/userToOfficeConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                officeId: '123',
                userId: '456'
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a userToOfficeConnector with no body', function(done) {
        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            officeId: '123',
            userId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/userToOfficeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/userToOfficeConnector')
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a userToOfficeConnector with the field for office id empty', function(done) {
        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            officeId: '123',
            userId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/userToOfficeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/userToOfficeConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                officeId: '',
                userId: '123'
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a userToOfficeConnector with the field for user id empty', function(done) {
        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            officeId: '123',
            userId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/userToOfficeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/userToOfficeConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                officeId: '123',
                userId: ''
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a userToOfficeConnector with too many fields in the body', function(done) {
        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            officeId: '123',
            userId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/userToOfficeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/userToOfficeConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                officeId: '123',
                userId: '456',
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a userToOfficeConnector with no officeId field', function(done) {
        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            officeId: '123',
            userId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/userToOfficeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/userToOfficeConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                attribut2eId: '123',
                userId: '456'
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a userToOfficeConnector with no userId field', function(done) {
        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            officeId: '123',
            userId: '456',
            createdAt: '2015-06-16T13:46:07.589Z',
            updatedAt: '2015-06-16T13:46:07.589Z',
            _id: '5580289f9a81250f00194d61'
        };

        nock(mockedUrl)
            .post('/userToOfficeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/userToOfficeConnector')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                officeId: '123',
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a userToOfficeConnector not correctly formatted as Json', function(done) {

        var resultNotJson = msg.INVALID_JSON;

        var badResultPost = {
            name: 'test1',
            createdAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '1234'
        };

        nock(mockedUrl)
            .post('/userToOfficeConnector')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/userToOfficeConnector')
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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all userToOfficeConnectors', function(done) {
        var resultAllGet = [{
            _id: '557eb8a89a81250f00194d52',
            officeId: '557d7cbc9a81250f00194d46',
            userId: '557eb7199a81250f00194d50',
            createdAt: '2015-06-15T11:36:08.114Z',
            updatedAt: '2015-06-15T11:36:08.114Z'
        }];

        nock(mockedUrl)
            .get('/userToOfficeConnector')
            .reply(200, resultAllGet)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/userToOfficeConnector')
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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting a userToOfficeConnector by user id', function(done) {
        var resultGetByUserId = [{
            _id: '123',
            officeId: '456',
            userId: '789',
            createdAt: '2015-06-15T11:36:08.114Z',
            updatedAt: '2015-06-15T11:36:08.114Z'
        }];

        nock(mockedUrl)
            .get('/userToOfficeConnector?userId=789')
            .reply(200, resultGetByUserId)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/userToOfficeConnector/user/789')
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
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultGetByUserId));
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting a userToOfficeConnector by office id', function(done) {

        var resultGetByOfficeId = [{
            _id: '123',
            officeId: '456',
            userId: '789',
            createdAt: '2015-06-15T11:36:08.114Z',
            updatedAt: '2015-06-15T11:36:08.114Z'
        }];

        nock(mockedUrl)
            .get('/userToOfficeConnector?officeId=456')
            .reply(200, resultGetByOfficeId)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/userToOfficeConnector/office/456')
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
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultGetByOfficeId));
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 404 and a correctly formatted string when getting userToOfficeConnectors by user id not in the database', function(done) {
        var resultNotInDb = msg.NO_SUCH_ITEM;

        nock(mockedUrl)
            .get('/userToOfficeConnector?userId=123')
            .reply(404, resultNotInDb)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/userToOfficeConnector/user/123')
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

    it('should reply with HTTP status code 404 and a correctly formatted string when getting userToOfficeConnectors by office id not in the database', function(done) {
        var resultNotInDb = msg.NO_SUCH_ITEM;

        nock(mockedUrl)
            .get('/userToOfficeConnector?officeId=123')
            .reply(404, resultNotInDb)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/userToOfficeConnector/office/123')
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

    it('should reply with HTTP status code 200 and a correctly formatted string when deleting a userToOfficeConnector by its id', function(done) {
        var resultDelete = msg.SUCCESS_DELETE;

        nock(mockedUrl)
            .delete('/userToOfficeConnector/123')
            .reply(204, {})

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/userToOfficeConnector/123')
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

    it('should reply with HTTP status code 404 and a correctly formatted string when deleting a userToOfficeConnector not in the database', function(done) {
        var resultUserNotInDb = msg.NO_SUCH_ITEM;

        nock(mockedUrl)
            .delete('/userToOfficeConnector/123')
            .reply(404, resultUserNotInDb)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/userToOfficeConnector/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultUserNotInDb);
                done();
            });
    });
});
