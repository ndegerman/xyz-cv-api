'use strict';

var server = require('../app/server');
var request = require('supertest');
var expect = require('expect.js');
var url = 'http://localhost:9000';
var nock = require('nock');
var mockedUrl = 'http://localhost:3232/';

describe('server', function() {
    before(function(done) {
        done();
    });

    after(function(done) {
        server.close();
        done();
    });
});

//===============================================================================

describe('/api/user', function() {

    var resultAllGet = [{
        _id: '557700a57b0f141400e8ceac',
        email: 'a@softhouse.se',
        name: 'A',
        createdAt: '2015-06-09T15:05:09.352Z',
        updatedAt: '2015-06-09T15:05:09.352Z'
    }];

    nock(mockedUrl, {allowUnmocked: true})
        .get('/user')
        .reply(200, resultAllGet);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all users', function(done) {
        request(url)
            .get('/api/user')
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
                expect(JSON.stringify(res.body[0])).to.equal(JSON.stringify(resultAllGet[0]));
                done();
            });
    });

    //===============================================================================

    var resultGetOne = {
        _id: '1234',
        name: 'test3',
        createAt: '2015-06-15T15:43:31.035Z',
        updatedAt: '2015-06-15T15:43:31.035Z'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .get('/user/1234')
        .reply(200, resultGetOne);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting a user by id', function(done) {
        request(url)
            .get('/api/user/1234')
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

    var resultNotInDb = 'No item with the given id was found.';

    nock(mockedUrl, {allowUnmocked: true})
        .get('/user/123')
        .reply(404, resultNotInDb);

    it('should reply with HTTP status code 404 and a correctly formatted string when getting a user not in the database by id', function(done) {
        request(url)
            .get('/api/user/123')
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

    var resultDelete = {
        message: 'The item was successfully removed.'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .delete('/user/1234')
        .reply(204, {});

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when deleting an existing user', function(done) {
        request(url)
            .delete('/api/user/1234')
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

    resultNotInDb = 'No item with the given id was found.';

    nock(mockedUrl, {allowUnmocked: true})
        .delete('/user/123')
        .reply(404, resultNotInDb);

    it('should reply with HTTP status code 404 and a correctly formatted string when deleting a user not in the database', function(done) {
        request(url)
            .delete('/api/user/123')
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

    var resultPut = 'The user was updated successfully.';

    var body1 = {
        role: 'newRole'
    };

    var user = {
        _id: '123',
        email: 'A@softhouse.se',
        name: 'A',
        role: 'role1',
        createdAt: '2015-06-22T13:28:23.982Z',
        updatedAt: '2015-06-23T11:26:13.809Z'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .put('/user/123')
        .reply(204)
        .get('/user/123')
        .reply(200, user);

    it('should reply with HTTP status code 204 and a correctly formatted string when updating a user\'s role', function(done) {
        request(url)
            .put('/api/user/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send(body1)

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(204);
                expect(res.error.text).to.equal(resultPut);
                done();
            });
    });

    //===============================================================================

    var resultPutNotInDb = 'No item with the given id was found.';

    var body3 = {
        role: 'newRole'
    };

    user = {
        _id: '123',
        email: 'A@softhouse.se',
        name: 'A',
        role: 'role1',
        createdAt: '2015-06-22T13:28:23.982Z',
        updatedAt: '2015-06-23T11:26:13.809Z'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .put('/user/123')
        .reply(204, resultPut)
        .get('/user/123')
        .reply(400, resultPutNotInDb);

    it('should reply with HTTP status code 404 and a correctly formatted string when updating a user\'s role not in database', function(done) {
        request(url)
            .put('/api/user/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send(body3)

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultPutNotInDb);
                done();
            });
    });

    //===============================================================================

    var resultPutBadFormat = 'Invalid JSON object.';

    var body = {
        rol2e: 'newRole'
    };

    user = {
        _id: '123',
        email: 'A@softhouse.se',
        name: 'A',
        role: 'role1',
        createdAt: '2015-06-22T13:28:23.982Z',
        updatedAt: '2015-06-23T11:26:13.809Z'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .put('/user/123')
        .reply(204, resultPut)
        .get('/user/123')
        .reply(200, user);

    it('should reply with HTTP status code 400 and a correctly formatted string when updating a user\'s role with an incorrectly formatted Json object', function(done) {
        request(url)
            .put('/api/user/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send(body)

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultPutBadFormat);
                done();
            });
    });

});
