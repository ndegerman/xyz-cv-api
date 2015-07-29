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

describe('/authentication', function() {

    afterEach(function(done) {
        nock.cleanAll();
        done();
    });

    var getUserByEmailResponse = [{
        _id:'558bacd8ed289d0f00d2c5f3',
        email:'a@softhouse.se',
        name:'A',
        role: 'user',
        createdAt:'2015-06-25T07:25:12.523Z',
        updatedAt:'2015-06-25T07:25:12.523Z'
    }];

    //===============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all roles with the correct headers set', function(done) {
        var resultAllGet = [{
            _id: '557d7cbc9a81250f00194d46',
            name: 'test1',
            createAt: '2015-06-14T13:08:12.348Z',
            updatedAt: '2015-06-14T13:08:12.348Z'
        }];

        nock(mockedUrl)
            .get('/role')
            .reply(200, resultAllGet)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/role')
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

    describe('/office', function() {
        //===============================================================================

        it('should reply with HTTP status code 200 and a correctly formatted JSON object when posting to office with a cached allowed account', function(done) {

            cacheHandler.setToUserRoleCache('a@softhouse.se', 'admin');
            cacheHandler.setToRoleAttributesCache('admin', ['canEditOffice']);

            var resultPost = {
                name: 'test2',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '557fd13a9a81250f00194d58'
            };

            nock(mockedUrl)
                .post('/office', {
                    name: 'test2'
                })
                .reply(200, resultPost)

                .get('/user?email=a@softhouse.se')
                .reply(200, getUserByEmailResponse);

            request(url)
                .post('/office')
                .set('x-forwarded-email', 'a@softhouse.se')
                .set('x-forwarded-user', 'A')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test2'
                })

                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }

                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultPost));

                    cacheHandler.clearUserRoleCache();
                    cacheHandler.clearRoleAttributesCache();
                    done();
                });
        });

        //===============================================================================

        it('should reply with HTTP status code 401 and a correctly formatted string when posting to office with no email header set', function(done) {
            var resultNotAuthorized = msg.UNAUTHORIZED;

            var resultPost = {
                name: 'test2',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '557fd13a9a81250f00194d58'
            };

            nock(mockedUrl)
                .post('/office', {
                    name: 'test2'
                })
                .reply(200, resultPost)

                .get('/user?email=a@softhouse.se')
                .reply(200, getUserByEmailResponse);

            request(url)
                .post('/office')
                .set('x-forwarded-user', 'A')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test2'
                })

                // end handles the response
                .end(function(err, res) {

                    expect(res).to.exist;
                    expect(err).to.exist;
                    expect(res.status).to.equal(401);
                    expect(res.text).to.equal(resultNotAuthorized);

                    cacheHandler.clearUserRoleCache();
                    cacheHandler.clearRoleAttributesCache();
                    done();
                });
        });

        //===============================================================================

        it('should reply with HTTP status code 401 and a correctly formatted string when posting to office with a cached unallowed account', function(done) {
            var resultNotAuthorized = msg.UNAUTHORIZED;

            cacheHandler.setToUserRoleCache('a@softhouse.se', 'user');
            cacheHandler.setToRoleAttributesCache('user', ['can\'tEditOffice']);

            var resultPost = {
                name: 'test2',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '557fd13a9a81250f00194d58'
            };

            nock(mockedUrl)
                .post('/office', {
                    name: 'test2'
                })
                .reply(200, resultPost)

                .get('/user?email=a@softhouse.se')
                .reply(200, getUserByEmailResponse);

            request(url)
                .post('/office')
                .set('x-forwarded-email', 'a@softhouse.se')
                .set('x-forwarded-user', 'A')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test2'
                })

                // end handles the response
                .end(function(err, res) {
                    expect(err).to.exist;
                    expect(res).to.exist;
                    expect(res.status).to.equal(401);
                    expect(res.text).to.equal(resultNotAuthorized);

                    cacheHandler.clearUserRoleCache();
                    cacheHandler.clearRoleAttributesCache();
                    done();
                });
        });

        //===============================================================================

        it('should reply with HTTP status code 200 and a correctly formatted string when posting to office with a cached role but no cached roleToAttributeConnectors, and is allowed', function(done) {

            cacheHandler.setToUserRoleCache('a@softhouse.se', 'user');

            var resultPost = {
                name: 'test2',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            };

            var resultGetRole = [{
                name: 'user',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            var resultGetConnectors = [{
                attributeId: '123',
                roleId: '123',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            var resultGetAttributes = [{
                name: 'canEditOffice',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            nock(mockedUrl)
                .post('/office', {
                    name: 'test2'
                })
                .reply(200, resultPost)

                .get('/user?email=a@softhouse.se')
                .reply(200, getUserByEmailResponse)

                .get('/role?name=user')
                .reply(200, resultGetRole)

                .get('/roleToAttributeConnector?roleId=123')
                .reply(200, resultGetConnectors)

                .get('/attribute')
                .reply(200, resultGetAttributes);

            request(url)
                .post('/office')
                .set('x-forwarded-email', 'a@softhouse.se')
                .set('x-forwarded-user', 'A')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test2'
                })

                // end handles the response
                .end(function(err, res) {
                    expect(err).to.exist;
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultPost));

                    cacheHandler.clearUserRoleCache();
                    cacheHandler.clearRoleAttributesCache();
                    done();
                });
        });

        //===============================================================================

        it('should reply with HTTP status code 200 and a correctly formatted JSON object when posting to office with a cached roleToAttributeConnector but no cached role, and is allowed', function(done) {

            cacheHandler.setToRoleAttributesCache('user', 'canEditOffice');

            var resultPost = {
                name: 'test2',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            };

            nock(mockedUrl)
                .post('/office', {
                    name: 'test2'
                })
                .reply(200, resultPost)

                .get('/user?email=a@softhouse.se')
                .reply(200, getUserByEmailResponse);

            request(url)
                .post('/office')
                .set('x-forwarded-email', 'a@softhouse.se')
                .set('x-forwarded-user', 'A')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test2'
                })

                // end handles the response
                .end(function(err, res) {
                    expect(err).to.exist;
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultPost));

                    cacheHandler.clearUserRoleCache();
                    cacheHandler.clearRoleAttributesCache();
                    done();
                });
        });

        //===============================================================================

        it('should reply with HTTP status code 401 and a correctly formatted string when posting to office with a cached role but no cached roleToAttributeConnectors, and is unallowed', function(done) {

            var resultNotAuthorized = msg.UNAUTHORIZED;
            cacheHandler.setToUserRoleCache('a@softhouse.se', 'user');

            var resultPost = {
                name: 'test2',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            };

            var resultGetRole = [{
                name: 'user',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            var resultGetConnectors = [];

            var resultGetAttributes = [{
                name: 'canEditOffice',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            nock(mockedUrl)
                .post('/office', {
                    name: 'test2'
                })
                .reply(200, resultPost)

                .get('/user?email=a@softhouse.se')
                .reply(200, getUserByEmailResponse)

                .get('/role?name=user')
                .reply(200, resultGetRole)

                .get('/roleToAttributeConnector?roleId=123')
                .reply(200, resultGetConnectors)

                .get('/attribute')
                .reply(200, resultGetAttributes);

            request(url)
                .post('/office')
                .set('x-forwarded-email', 'a@softhouse.se')
                .set('x-forwarded-user', 'A')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test2'
                })

                // end handles the response
                .end(function(err, res) {
                    expect(err).to.exist;
                    expect(res).to.exist;
                    expect(res.status).to.equal(401);
                    expect(res.text).to.equal(resultNotAuthorized);

                    cacheHandler.clearUserRoleCache();
                    cacheHandler.clearRoleAttributesCache();
                    done();
                });
        });

        //===============================================================================

        it('should reply with HTTP status code 401 and a correctly formatted string when posting to office with a cached role but no cached roleToAttributeConnectors, and is unallowed', function(done) {

            var resultNotAuthorized = msg.UNAUTHORIZED;
            cacheHandler.setToUserRoleCache('a@softhouse.se', 'user');

            var resultPost = {
                name: 'test2',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            };

            var resultGetRole = [{
                name: 'user',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            var resultGetConnectors = [{
                attributeId: '123',
                roleId: '123',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            var resultGetAttributes = [{
                name: 'can\'tEditOffice',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            nock(mockedUrl)
                .post('/office', {
                    name: 'test2'
                })
                .reply(200, resultPost)

                .get('/user?email=a@softhouse.se')
                .reply(200, getUserByEmailResponse)

                .get('/role?name=user')
                .reply(200, resultGetRole)

                .get('/roleToAttributeConnector?roleId=123')
                .reply(200, resultGetConnectors)

                .get('/attribute')
                .reply(200, resultGetAttributes);

            request(url)
                .post('/office')
                .set('x-forwarded-email', 'a@softhouse.se')
                .set('x-forwarded-user', 'A')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test2'
                })

                // end handles the response
                .end(function(err, res) {
                    expect(err).to.exist;
                    expect(res).to.exist;
                    expect(res.status).to.equal(401);
                    expect(res.text).to.equal(resultNotAuthorized);

                    cacheHandler.clearUserRoleCache();
                    cacheHandler.clearRoleAttributesCache();
                    done();
                });
        });

        //===============================================================================

        it('should reply with HTTP status code 200 and a correctly formatted string when posting to office with no cached role or roleToAttributeConnector, but is allowed', function(done) {

            var resultPost = {
                name: 'test2',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            };

            var resultGetRole = [{
                name: 'user',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            var resultGetConnectors = [{
                attributeId: '123',
                roleId: '123',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            var resultGetAttributes = [{
                name: 'canEditOffice',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            nock(mockedUrl)
                .post('/office', {
                    name: 'test2'
                })
                .reply(200, resultPost)

                .get('/user?email=a@softhouse.se')
                .reply(200, getUserByEmailResponse)

                .get('/role?name=user')
                .reply(200, resultGetRole)

                .get('/roleToAttributeConnector?roleId=123')
                .reply(200, resultGetConnectors)

                .get('/attribute')
                .reply(200, resultGetAttributes);

            request(url)
                .post('/office')
                .set('x-forwarded-email', 'a@softhouse.se')
                .set('x-forwarded-user', 'A')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test2'
                })

                // end handles the response
                .end(function(err, res) {
                    expect(err).to.exist;
                    expect(res).to.exist;
                    expect(res.status).to.equal(200);
                    expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultPost));

                    cacheHandler.clearUserRoleCache();
                    cacheHandler.clearRoleAttributesCache();
                    done();
                });
        });

        //===============================================================================

        it('should reply with HTTP status code 401 and a correctly formatted string when posting to office with no cached role or roleToAttributeConnector, and is unallowed', function(done) {

            var resultNotAuthorized = msg.UNAUTHORIZED;
            var resultPost = {
                name: 'test2',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            };

            var resultGetRole = [{
                name: 'user',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            var resultGetConnectors = [{
                attributeId: '123',
                roleId: '123',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            var resultGetAttributes = [{
                name: 'can\'tEditOffice',
                createAt: '2015-06-16T07:33:14.385Z',
                updatedAt: '2015-06-16T07:33:14.385Z',
                _id: '123'
            }];

            nock(mockedUrl)
                .post('/office', {
                    name: 'test2'
                })
                .reply(200, resultPost)

                .get('/user?email=a@softhouse.se')
                .reply(200, getUserByEmailResponse)

                .get('/role?name=user')
                .reply(200, resultGetRole)

                .get('/roleToAttributeConnector?roleId=123')
                .reply(200, resultGetConnectors)

                .get('/attribute')
                .reply(200, resultGetAttributes);

            request(url)
                .post('/office')
                .set('x-forwarded-email', 'a@softhouse.se')
                .set('x-forwarded-user', 'A')
                .set('Content-Type', 'application/json')
                .send({
                    name: 'test2'
                })

                // end handles the response
                .end(function(err, res) {
                    expect(err).to.exist;
                    expect(res).to.exist;
                    expect(res.status).to.equal(401);
                    expect(res.text).to.equal(resultNotAuthorized);

                    cacheHandler.clearUserRoleCache();
                    cacheHandler.clearRoleAttributesCache();
                    done();
                });
        });
    });
});
