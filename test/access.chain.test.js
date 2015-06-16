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

describe('/api/access', function() {

    var resultAllGet = [{
        "_id": "557eb8a89a81250f00194d52",
        "attribute_id": "557d7cbc9a81250f00194d46",
        "role_id": "557eb7199a81250f00194d50",
        "createdAt": "2015-06-15T11:36:08.114Z",
        "updatedAt": "2015-06-15T11:36:08.114Z"
    }];

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .get('/access')
        .reply(200, resultAllGet);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all accesses', function(done) {
        request(url)
            .get('/api/access')
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
        "attribute_id": "123",
        "role_id": "456",
        "createdAt": "2015-06-16T10:33:27.803Z",
        "updatedAt": "2015-06-16T10:33:27.803Z",
        "_id": "557ffb779a81250f00194d60"
    };

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
    .post('/access', {
        attribute_id: "123",
        role_id: "456"
    })
    .reply(200, resultPost);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when posting an access', function(done) {
        request(url)
            .post('/api/access')
            .set('x-forwarded-email', 'anton.lundin2@softhouse.se')
            .set('x-forwarded-user', 'Anton Lundin2')
            .set('Content-Type', 'application/json')
            .send({
                attribute_id: "123",
                role_id: "456"
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

    var resultGetByRoleId = [{
        "_id": "123",
        "attribute_id": "456",
        "role_id": "789",
        "createdAt": "2015-06-15T11:36:08.114Z",
        "updatedAt": "2015-06-15T11:36:08.114Z"
    }];

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
    .get('/access?role_id=789')
    .reply(200, resultGetByRoleId);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting an access by role id', function(done) {
        request(url)
            .get('/api/access/role/789')
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
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultGetByRoleId));
                done();
            });
    });

//===============================================================================

    var resultGetByAttributeId = [{
        "_id": "123",
        "attribute_id": "456",
        "role_id": "789",
        "createdAt": "2015-06-15T11:36:08.114Z",
        "updatedAt": "2015-06-15T11:36:08.114Z"
    }];

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
    .get('/access?attribute_id=456')
    .reply(200, resultGetByAttributeId);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting an access by attribute id', function(done) {
        request(url)
            .get('/api/access/attribute/456')
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
                expect(JSON.stringify(res.body)).to.equal(JSON.stringify(resultGetByAttributeId));
                done();
            });
    });


/*//===============================================================================

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
    });*/

//===============================================================================  


});