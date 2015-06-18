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

describe('/api/skill', function() {

    //===============================================================================

    var resultPost = {
        name: 'test2',
        createAt: '2015-06-16T07:33:14.385Z',
        updatedAt: '2015-06-16T07:33:14.385Z',
        _id: '557fd13a9a81250f00194d58'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/skill', {
            name: 'test2'
        })
        .reply(200, resultPost);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when creating a new skill', function(done) {
        request(url)
            .post('/api/skill')
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

    var resultNoArg = 'Invalid JSON object.';

    var badResultPost = {
        name: '',
        createAt: '2015-06-16T07:33:14.385Z',
        updatedAt: '2015-06-16T07:33:14.385Z',
        _id: '557fd13a9a81250f00194d58'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/skill')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an empty skill', function(done) {
        request(url)
            .post('/api/skill')
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

    var resultEmptyName = 'Invalid JSON object.';

    badResultPost = {
        name: '',
        createAt: '2015-06-16T07:33:14.385Z',
        updatedAt: '2015-06-16T07:33:14.385Z',
        _id: '557fd13a9a81250f00194d58'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/skill')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a skill with the name field empty', function(done) {
        request(url)
            .post('/api/skill')
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

    var resultBadJson = 'Invalid JSON object.';

    badResultPost = {
        name: 'test1',
        createAt: '2015-06-16T07:33:14.385Z',
        updatedAt: '2015-06-16T07:33:14.385Z',
        _id: '1234'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/skill')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a skill with too many fields in the body', function(done) {
        request(url)
            .post('/api/skill')
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
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultBadJson);
                done();
            });
    });

    //===============================================================================

    var resultNoNameField = 'Invalid JSON object.';

    badResultPost = {
        name: 'test1',
        createAt: '2015-06-16T07:33:14.385Z',
        updatedAt: '2015-06-16T07:33:14.385Z',
        _id: '1234'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/skill')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a skill without a name field', function(done) {
        request(url)
            .post('/api/skill')
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

    //===============================================================================

    var resultList = 'Invalid JSON object.';

    badResultPost = {
        name: 'test1',
        createAt: '2015-06-16T07:33:14.385Z',
        updatedAt: '2015-06-16T07:33:14.385Z',
        _id: '1234'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/skill')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a skill with a Json list', function(done) {
        request(url)
            .post('/api/skill')
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

    var resultNotJson = 'invalid json';

    badResultPost = {
        name: 'test1',
        createAt: '2015-06-16T07:33:14.385Z',
        updatedAt: '2015-06-16T07:33:14.385Z',
        _id: '1234'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .post('/skill')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting a skill not correctly formatted as Json', function(done) {
        request(url)
            .post('/api/skill')
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
        _id: '557d7cbc9a81250f00194d46',
        name: 'test1',
        createAt: '2015-06-14T13:08:12.348Z',
        updatedAt: '2015-06-14T13:08:12.348Z'
    }];

    nock(mockedUrl, {allowUnmocked: true})
        .get('/skill')
        .reply(200, resultAllGet);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all skills', function(done) {
        request(url)
            .get('/api/skill')
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

    var resultGetOne = {
        _id: '1234',
        name: 'test3',
        createAt: '2015-06-15T15:43:31.035Z',
        updatedAt: '2015-06-15T15:43:31.035Z'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .get('/skill/1234')
        .reply(200, resultGetOne);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting a skill by its id', function(done) {
        request(url)
            .get('/api/skill/1234')
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

    var resultSkillNotInDb = 'No item with the given id was found.';

    nock(mockedUrl, {allowUnmocked: true})
        .get('/skill/123')
        .reply(404, resultSkillNotInDb);

    it('should reply with HTTP status code 404 and a correctly formatted string when getting a skill not in the database', function(done) {
        request(url)
            .get('/api/skill/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultSkillNotInDb);
                done();
            });
    });

    //===============================================================================

    var resultDelete = {
        message: 'The item was successfully removed.'
    };

    nock(mockedUrl, {allowUnmocked: true})
        .delete('/skill/1234')
        .reply(204, {});

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when deleting an existing skill', function(done) {
        request(url)
            .delete('/api/skill/1234')
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

    resultSkillNotInDb = 'No item with the given id was found.';

    nock(mockedUrl, {allowUnmocked: true})
        .delete('/skill/123')
        .reply(404, resultSkillNotInDb);

    it('should reply with HTTP status code 404 and a correctly formatted string when deleting a skill not in the database', function(done) {
        request(url)
            .delete('/api/skill/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultSkillNotInDb);
                done();
            });
    });
});
