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

describe('/api/roleAttributeConnector', function() {

    //===============================================================================

    var resultPost = {
        attributeId: '123',
        roleId: '456',
        createdAt: '2015-06-16T10:33:27.803Z',
        updatedAt: '2015-06-16T10:33:27.803Z',
        _id: '557ffb779a81250f00194d60'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/roleAttributeConnector', {
            attributeId: '123',
            roleId: '456'
        })
        .reply(200, resultPost);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when posting a roleAttributeConnector', function(done) {
        request(url)
            .post('/api/roleAttributeConnector')
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

    var resultNoArg = 'Invalid JSON object.';

    var badResultPost = {
        attributeId: '123',
        roleId: '456',
        createdAt: '2015-06-16T13:46:07.589Z',
        updatedAt: '2015-06-16T13:46:07.589Z',
        _id: '5580289f9a81250f00194d61'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/roleAttributeConnector')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleAttributeConnector with no body', function(done) {
        request(url)
            .post('/api/roleAttributeConnector')
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

    resultNoArg = 'Invalid JSON object.';

    badResultPost = {
        attributeId: '123',
        roleId: '456',
        createdAt: '2015-06-16T13:46:07.589Z',
        updatedAt: '2015-06-16T13:46:07.589Z',
        _id: '5580289f9a81250f00194d61'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/roleAttributeConnector')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleAttributeConnector with the field for attribute id empty', function(done) {
        request(url)
            .post('/api/roleAttributeConnector')
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

    resultNoArg = 'Invalid JSON object.';

    badResultPost = {
        attributeId: '123',
        roleId: '456',
        createdAt: '2015-06-16T13:46:07.589Z',
        updatedAt: '2015-06-16T13:46:07.589Z',
        _id: '5580289f9a81250f00194d61'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/roleAttributeConnector')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleAttributeConnector with the field for role id empty', function(done) {
        request(url)
            .post('/api/roleAttributeConnector')
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

    resultNoArg = 'Invalid JSON object.';

    badResultPost = {
        attributeId: '123',
        roleId: '456',
        createdAt: '2015-06-16T13:46:07.589Z',
        updatedAt: '2015-06-16T13:46:07.589Z',
        _id: '5580289f9a81250f00194d61'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/roleAttributeConnector')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleAttributeConnector with too many fields in the body', function(done) {
        request(url)
            .post('/api/roleAttributeConnector')
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
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultNoArg);
                done();
            });
    });

    //===============================================================================

    resultNoArg = 'Invalid JSON object.';

    badResultPost = {
        attributeId: '123',
        roleId: '456',
        createdAt: '2015-06-16T13:46:07.589Z',
        updatedAt: '2015-06-16T13:46:07.589Z',
        _id: '5580289f9a81250f00194d61'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/roleAttributeConnector')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleAttributeConnector with no attributeId field', function(done) {
        request(url)
            .post('/api/roleAttributeConnector')
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

    resultNoArg = 'Invalid JSON object.';

    badResultPost = {
        attributeId: '123',
        roleId: '456',
        createdAt: '2015-06-16T13:46:07.589Z',
        updatedAt: '2015-06-16T13:46:07.589Z',
        _id: '5580289f9a81250f00194d61'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/roleAttributeConnector')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleAttributeConnector with no roleId field', function(done) {
        request(url)
            .post('/api/roleAttributeConnector')
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

    var resultNotJson = 'invalid json';

    badResultPost = {
        name: 'test1',
        createdAt: '2015-06-16T07:33:14.385Z',
        updatedAt: '2015-06-16T07:33:14.385Z',
        _id: '1234'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/roleAttributeConnector')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a roleAttributeConnector not correctly formatted as Json', function(done) {
        request(url)
            .post('/api/roleAttributeConnector')
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

    var resultAllGet = [{
        _id: '557eb8a89a81250f00194d52',
        attributeId: '557d7cbc9a81250f00194d46',
        roleId: '557eb7199a81250f00194d50',
        createdAt: '2015-06-15T11:36:08.114Z',
        updatedAt: '2015-06-15T11:36:08.114Z'
    }];

    nock(mockedUrl, {allowUnmocked: true})
        .get('/roleAttributeConnector')
        .reply(200, resultAllGet);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all roleAttributeConnectors', function(done) {
        request(url)
            .get('/api/roleAttributeConnector')
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

    var resultGetByRoleId = [{
        _id: '123',
        attributeId: '456',
        roleId: '789',
        createdAt: '2015-06-15T11:36:08.114Z',
        updatedAt: '2015-06-15T11:36:08.114Z'
    }];

    nock(mockedUrl, {allowUnmocked: true})
        .get('/roleAttributeConnector?roleId=789')
        .reply(200, resultGetByRoleId);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting a roleAttributeConnector by role id', function(done) {
        request(url)
            .get('/api/roleAttributeConnector/role/789')
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

    var resultGetByAttributeId = [{
        _id: '123',
        attributeId: '456',
        roleId: '789',
        createdAt: '2015-06-15T11:36:08.114Z',
        updatedAt: '2015-06-15T11:36:08.114Z'
    }];

    nock(mockedUrl, {allowUnmocked: true})
        .get('/roleAttributeConnector?attributeId=456')
        .reply(200, resultGetByAttributeId);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting a roleAttributeConnector by attribute id', function(done) {
        request(url)
            .get('/api/roleAttributeConnector/attribute/456')
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

    //===============================================================================

    var resultNotInDb = {
        message: 'No item with the given id was found.'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .get('/roleAttributeConnector?roleId=123')
        .reply(404, resultNotInDb);

    it('should reply with HTTP status code 404 and a correctly formatted string when getting roleAttributeConnectors by role id not in the database', function(done) {
        request(url)
            .get('/api/roleAttributeConnector/role/123')
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

    resultNotInDb = {
        message: 'No item with the given id was found.'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .get('/roleAttributeConnector?attributeId=123')
        .reply(404, resultNotInDb);

    it('should reply with HTTP status code 404 and a correctly formatted string when getting roleAttributeConnectors by attribute id not in the database', function(done) {
        request(url)
            .get('/api/roleAttributeConnector/attribute/123')
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

    var resultDelete = {
        message: 'The item was successfully removed.'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .delete('/roleAttributeConnector/123')
        .reply(204, {});

    it('should reply with HTTP status code 200 and a correctly formatted string when deleting a roleAttributeConnector by its id', function(done) {
        request(url)
            .delete('/api/roleAttributeConnector/123')
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

    var resultRoleNotInDb = 'No item with the given id was found.';

    nock(mockedUrl, {allowUnmocked: true})
        .delete('/roleAttributeConnector/123')
        .reply(404, resultRoleNotInDb);

    it('should reply with HTTP status code 404 and a correctly formatted string when deleting a roleAttributeConnector not in the database', function(done) {
        request(url)
            .delete('/api/roleAttributeConnector/123')
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
