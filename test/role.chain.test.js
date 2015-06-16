var server = require('../app/server');
var assert = require('assert');
var http = require('http');
var request = require('supertest');
var expect = require('expect.js');
var url = 'http://localhost:9000';
var nock = require('nock');
var mockedUrl = 'http://localhost:3232/';

describe('server', function () {
    before(function (done) {
        done();
    });

    after(function (done) {
        server.close();
        done();
    });
});

//===============================================================================

describe('/api/role', function() {

    var resultAllGet = [{
        "_id": "557d7cbc9a81250f00194d46",
        "name": "test1",
        "createdAt": "2015-06-14T13:08:12.348Z",
        "updatedAt": "2015-06-14T13:08:12.348Z"
    }];

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .get('/role')
        .reply(200, resultAllGet);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when making a GET request to /api/role', function(done) {
        request(url)
            .get('/api/role')
            .set('x-forwarded-email', 'anton.lundin2@softhouse.se')
            .set('x-forwarded-user', 'Anton Lundin2')
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

    var resultPost = {
        "name": "test2",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "557fd13a9a81250f00194d58"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
    .post('/role', {
        name: 'test2'
    })
    .reply(200, resultPost);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when making a POST request to /api/role', function(done) {
        request(url)
            .post('/api/role')
            .set('x-forwarded-email', 'anton.lundin2@softhouse.se')
            .set('x-forwarded-user', 'Anton Lundin2')
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

    var resultDelete = {
        message: 'The item was successfully removed.'
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
    .delete('/role/1234')
    .reply(200, resultDelete);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when making a DELETE request to /api/role/1234', function(done) {
        request(url)
            .delete('/api/role/1234')
            .set('x-forwarded-email', 'anton.lundin2@softhouse.se')
            .set('x-forwarded-user', 'Anton Lundin2')
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

    var resultGetOne = {
        "_id": "1234",
        "name": "test3",
        "createdAt": "2015-06-15T15:43:31.035Z",
        "updatedAt": "2015-06-15T15:43:31.035Z"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
    .get('/role/1234')
    .reply(200, resultGetOne);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when making a GET request to /api/role/1234', function(done) {
        request(url)
            .get('/api/role/1234')
            .set('x-forwarded-email', 'anton.lundin2@softhouse.se')
            .set('x-forwarded-user', 'Anton Lundin2')
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

    var resultNoArg = 'Invalid JSON object.';

    var badResultPost = {
        "name": "",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "557fd13a9a81250f00194d58"
    };


    var couchdb = nock(mockedUrl, {allowUnmocked: true})
    .post('/role')
    .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when making an empty POST request to api/role', function(done) {
        request(url)
            .post('/api/role')
            .set('x-forwarded-email', 'anton.lundin2@softhouse.se')
            .set('x-forwarded-user', 'Anton Lundin2')
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
        "name": "",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "557fd13a9a81250f00194d58"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
    .post('/role')
    .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when making a POST request with an empty name field to api/role', function(done) {
        request(url)
            .post('/api/role')
            .set('x-forwarded-email', 'anton.lundin2@softhouse.se')
            .set('x-forwarded-user', 'Anton Lundin2')
            .set('Content-Type', 'application/json')
            .send({
                name: ""
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
        "name": "test1",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "1234"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
    .post('/role')
    .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when making a POST request with an additional field to api/role', function(done) {
        request(url)
            .post('/api/role')
            .set('x-forwarded-email', 'anton.lundin2@softhouse.se')
            .set('x-forwarded-user', 'Anton Lundin2')
            .set('Content-Type', 'application/json')
            .send({
                name: "test1",
                id: "1234"
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
        "name": "test1",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "1234"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
    .post('/role')
    .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when making a POST request without a name field to api/role', function(done) {
        request(url)
            .post('/api/role')
            .set('x-forwarded-email', 'anton.lundin2@softhouse.se')
            .set('x-forwarded-user', 'Anton Lundin2')
            .set('Content-Type', 'application/json')
            .send({
                id: "1234"
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
        "name": "test1",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "1234"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
    .post('/role')
    .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when making a POST request with a JSON list to api/role', function(done) {
        request(url)
            .post('/api/role')
            .set('x-forwarded-email', 'anton.lundin2@softhouse.se')
            .set('x-forwarded-user', 'Anton Lundin2')
            .set('Content-Type', 'application/json')
            .send([
            {
                name: "1234"
            }, 
            { 
                id: "1234"}
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

    var resultNotJson = 'Invalid JSON object.';

    badResultPost = {
        "name": "test1",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "1234"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
    .post('/role')
    .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when making a POST request not formatted as JSON to api/role', function(done) {
        request(url)
            .post('/api/role')
            .set('x-forwarded-email', 'anton.lundin2@softhouse.se')
            .set('x-forwarded-user', 'Anton Lundin2')
            .set('Content-Type', 'application/json')
            .send('"name": "1234"')
            // end handles the response
            .end(function(err, res) {               
                expect(err).to.exist;
                expect(res).to.exist;                
                expect(res.status).to.equal(400);
                expect(res.error.text).to.equal(resultNotJson);
                done();
            })
    });

//===============================================================================  


});