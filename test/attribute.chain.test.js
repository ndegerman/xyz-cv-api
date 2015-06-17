var server = require('../app/server');
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

describe('/api/attribute', function() {

//===============================================================================    

    var resultPost = {
        "name": "CanCreateUser",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "557fd13a9a81250f00194d58"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .post('/attribute', {
            name: 'test1'
        })
        .reply(200, resultPost);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when posting an attribute', function(done) {
        request(url)
            .post('/api/attribute')
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

    var resultNoArg = 'Invalid JSON object.';

    badResultPost = {
        "name": "",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "557fd13a9a81250f00194d58"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .post('/attribute')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an attribute with no body', function(done) {
        request(url)
            .post('/api/attribute')
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

    var resultNoPost = 'Invalid JSON object.';

    badResultPost = {
        "name": "",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "557fd13a9a81250f00194d58"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .post('/attribute')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an attribute with the name field empty', function(done) {
        request(url)
            .post('/api/attribute')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                "name": ""
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

    var resultNoArg = 'Invalid JSON object.';

    badResultPost = {
        "name": "123",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "557fd13a9a81250f00194d58"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .post('/attribute')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an attribute with too many fields in the body', function(done) {
        request(url)
            .post('/api/attribute')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                "name": "123",
                "id": "456"
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

    var resultNoArg = 'Invalid JSON object.';

    badResultPost = {
        "name2": "123",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "557fd13a9a81250f00194d58"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .post('/attribute')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an attribute that is missing the name field in the body', function(done) {
        request(url)
            .post('/api/attribute')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send({
                "name2": "123"
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
        "name": "test1",
        "createdAt": "2015-06-16T07:33:14.385Z",
        "updatedAt": "2015-06-16T07:33:14.385Z",
        "_id": "1234"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .post('/attribute')
        .reply(200, badResultPost);

    it('should reply with HTTP status code 400 and a correctly formatted string when posting an attribute not correctly formatted as Json', function(done) {
        request(url)
            .post('/api/attribute')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
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

    var resultAllGet = [{
        "_id": "557d7cbc9a81250f00194d46",
        "name": "test1",
        "createdAt": "2015-06-14T13:08:12.348Z",
        "updatedAt": "2015-06-14T13:08:12.348Z"
    }];

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .get('/attribute')
        .reply(200, resultAllGet);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all attributes', function(done) {
        request(url)
            .get('/api/attribute')
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

    var resultGet = {
        "_id": "123",
        "name": "456",
        "createdAt": "2015-06-14T13:08:12.348Z",
        "updatedAt": "2015-06-14T13:08:12.348Z"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .get('/attribute/123')
        .reply(200, resultGet);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting an existing attribute', function(done) {
        request(url)
            .get('/api/attribute/123')
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
    
    var resultNotInDb = {
        message: 'No item with the given id was found.'
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .get('/attribute/123')
        .reply(404, resultNotInDb);

    it('should reply with HTTP status code 404 and a correctly formatted string when getting an attribute by its id not in the database', function(done) {
        request(url)
            .get('/api/attribute/123')
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
            })
    });

//===============================================================================

    var resultDelete = {
        message: 'The item was successfully removed.'
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .delete('/attribute/1234')
        .reply(204, {});

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when deleting an existing attribute', function(done) {
        request(url)
            .delete('/api/attribute/1234')
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

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .delete('/attribute/123')
        .reply(404, resultRoleNotInDb);

    it('should reply with HTTP status code 404 and a correctly formatted string when deleting an attribute not in the database', function(done) {
        request(url)
            .delete('/api/attribute/123')
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
            })
    });
});