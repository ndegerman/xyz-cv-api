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


describe('/assignment', function() {

    beforeEach(function(done) {
        cacheHandler.setToUserRoleCache('a@softhouse.se', 'admin');
        cacheHandler.setToRoleAttributesCache('admin', ['canEditAssignment', 'canViewAssignment']);
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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when creating a new assignment', function(done) {

        var resultPost = {
            name: 'test2',
            createAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '557fd13a9a81250f00194d58'
        };

        nock(mockedUrl)
            .post('/assignment', {
                name: 'test2'
            })
            .reply(200, resultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/assignment')
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
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an empty assignment', function(done) {

        var resultNoArg = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            name: '',
            createAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '557fd13a9a81250f00194d58'
        };

        nock(mockedUrl)
            .post('/assignment')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/assignment')
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an assignment with the name field empty', function(done) {

        var resultEmptyName = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            name: '',
            createAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '557fd13a9a81250f00194d58'
        };

        nock(mockedUrl)
            .post('/assignment')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/assignment')
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
                expect(res.error.text).to.equal(resultEmptyName);
                done();
            });
    });

    //===============================================================================

    it('should correctly extract the needed properties and reply with HTTP status code 200 and a correctly formatted string when posting an assignment with too many fields in the body', function(done) {

        var resultPost = {
            name: 'test1',
            createAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '1234'
        };

        nock(mockedUrl)
            .post('/assignment', {
                name: 'test1'
            })
            .reply(200, resultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/assignment')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                name: 'test1',
                id: '1234'
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

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an assignment without a name field', function(done) {
        var resultNoNameField = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            name: 'test1',
            createAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '1234'
        };

        nock(mockedUrl)
            .post('/assignment')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/assignment')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                id: '1234'
            })

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultNoNameField);
                done();
            });
    });

    //==============================================================================

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an assignment with a Json list', function(done) {
        var resultList = msg.INVALID_JSON_OBJECT;

        var badResultPost = {
            name: 'test1',
            createAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '1234'
        };

        nock(mockedUrl)
            .post('/assignment')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/assignment')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send([
            {
                name: '1234'
            },
            {
                id: '1234'}
            ])

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultList);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an assignment not correctly formatted as Json', function(done) {

        var resultNotJson = msg.INVALID_JSON;

        var badResultPost = {
            name: 'test1',
            createAt: '2015-06-16T07:33:14.385Z',
            updatedAt: '2015-06-16T07:33:14.385Z',
            _id: '1234'
        };

        nock(mockedUrl)
            .post('/assignment')
            .reply(200, badResultPost)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/assignment')
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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all assignments', function(done) {
        var resultAllGet = [{
            _id: '557d7cbc9a81250f00194d46',
            name: 'test1',
            createAt: '2015-06-14T13:08:12.348Z',
            updatedAt: '2015-06-14T13:08:12.348Z'
        }];

        nock(mockedUrl)
            .get('/assignment?')
            .reply(200, resultAllGet)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/assignment')
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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting an assignment by its id', function(done) {
        var resultGetOne = {
            _id: '1234',
            name: 'test3',
            createAt: '2015-06-15T15:43:31.035Z',
            updatedAt: '2015-06-15T15:43:31.035Z'
        };

        nock(mockedUrl)
            .get('/assignment/1234')
            .reply(200, resultGetOne)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/assignment/1234')
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
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultGetOne));
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 404 and a correctly formatted string when getting an assignment not in the database', function(done) {
        var resultAssignmentNotInDb = msg.NO_SUCH_ITEM;

        nock(mockedUrl)
            .get('/assignment/123')
            .reply(404, resultAssignmentNotInDb)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/assignment/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultAssignmentNotInDb);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when deleting an existing assignment', function(done) {
        var resultDelete = msg.SUCCESS_DELETE;

        nock(mockedUrl)
            .delete('/assignment/1234')
            .reply(204, {})

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/assignment/1234')
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

    it('should reply with HTTP status code 404 and a correctly formatted string when deleting an assignment not in the database', function(done) {
        var resultAssignmentNotInDb = msg.NO_SUCH_ITEM;

        nock(mockedUrl)
            .delete('/assignment/123')
            .reply(404, resultAssignmentNotInDb)

            .get('/user?email=a@softhouse.se&')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/assignment/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultAssignmentNotInDb);
                done();
            });
    });
});
