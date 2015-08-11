'use strict';

var server = require('../app/server');
var request = require('supertest');
var expect = require('expect.js');
var nock = require('nock');
var config = require('config');
var msg = require('../app/utils/message.handler');
var url = 'localhost:' + config.PORT;
var mockedUrl = config.API_URL;
var cacheHandler = require('../app/utils/cache.handler');

describe('/attribute', function() {

    beforeEach(function(done) {
        cacheHandler.setToUserRoleCache('a@softhouse.se', 'admin');
        cacheHandler.setToRoleAttributesCache('admin', ['canEditAttribute']);
        done();
    });

    afterEach(function(done) {
        nock.cleanAll();
        cacheHandler.clearUserRoleCache();
        cacheHandler.clearRoleAttributesCache();
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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when posting an attribute', function(done) {
        var resultPost = {
            name: 'CanCreateUser',
            createdAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '557fd13a9a81250f00194d58'
        };

        nock(mockedUrl)
            .post('/attribute', {
                name: 'test1',
                hiddenFields: null
            })
            .reply(200, resultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/attribute')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                name: 'test1'
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an attribute with no body', function(done) {
        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            name: '',
            createdAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '557fd13a9a81250f00194d58'
        };

        nock(mockedUrl)
            .post('/attribute')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/attribute')
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an attribute with the name field empty', function(done) {
        var resultNoPost = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            name: '',
            createdAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '557fd13a9a81250f00194d58'
        };

        nock(mockedUrl)
            .post('/attribute')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/attribute')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                name: ''
            })

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultNoPost);
                done();
            });
    });

    //===============================================================================

    it('should correctly extract the needed properties and reply with HTTP status code 200 and a correctly formatted string when posting an attribute with too many fields in the body', function(done) {

        var resultPost = {
            name: '123',
            createdAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '557fd13a9a81250f00194d58'
        };

        nock(mockedUrl)
            .post('/attribute', {
                name: '123',
                hiddenFields: null
            })
            .reply(200, resultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/attribute')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                name: '123',
                id: '456'
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an attribute that is missing the name field in the body', function(done) {

        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            name2: '123',
            createdAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '557fd13a9a81250f00194d58'
        };

        nock(mockedUrl)
            .post('/attribute')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/attribute')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                name2: '123'
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an attribute not correctly formatted as Json', function(done) {
        var resultNotJson = msg.INVALID_JSON;

        var badResultPost = {
            name: 'test1',
            createdAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '1234'
        };

        nock(mockedUrl)
            .post('/attribute')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/attribute')
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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all attributes', function(done) {
        var resultAllGet = [{
            _id: '557d7cbc9a81250f00194d46',
            name: 'test1',
            createdAt: '2015-06-14T13:08:12.348Z',
            updatedAt: '2015-06-14T13:08:12.348Z'
        }];

        nock(mockedUrl)
            .get('/attribute?')
            .reply(200, resultAllGet)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/attribute')
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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting an existing attribute', function(done) {
        var resultGet = {
            _id: '123',
            name: '456',
            createdAt: '2015-06-14T13:08:12.348Z',
            updatedAt: '2015-06-14T13:08:12.348Z'
        };

        nock(mockedUrl)
            .get('/attribute/123')
            .reply(200, resultGet)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/attribute/123')
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
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultGet));
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 404 and a correctly formatted string when getting an attribute by its id not in the database', function(done) {

        var resultNotInDb = msg.NO_SUCH_ITEM;

        nock(mockedUrl)
            .get('/attribute/123')
            .reply(404, resultNotInDb)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/attribute/123')
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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when deleting an existing attribute', function(done) {

        var resultDelete = msg.SUCCESS_DELETE;
        nock(mockedUrl)
            .delete('/attribute/1234')
            .reply(204, {})

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/attribute/1234')
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

    it('should reply with HTTP status code 404 and a correctly formatted string when deleting an attribute not in the database', function(done) {

        var resultRoleNotInDb = msg.NO_SUCH_ITEM;

        nock(mockedUrl)
            .delete('/attribute/123')
            .reply(404, resultRoleNotInDb)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/attribute/123')
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
