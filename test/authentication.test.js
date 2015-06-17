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

describe('/api/authentication', function() {

//===============================================================================

    var resultAllGet = [{
        "_id": "557d7cbc9a81250f00194d46",
        "name": "test1",
        "createdAt": "2015-06-14T13:08:12.348Z",
        "updatedAt": "2015-06-14T13:08:12.348Z"
    }];

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .get('/role')
        .reply(200, resultAllGet);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all roles with the correct headers set', function(done) {
        request(url)
            .get('/api/role')
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

    var unauthorized = 'Unauthorized access.';

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .get('/role')
        .reply(200, resultAllGet);

    it('should reply with HTTP status code 401 when getting all roles with no headers set', function(done) {
        request(url)
            .get('/api/role')
            .send()
            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist
                expect(res).to.exist;                
                expect(res.status).to.equal(401);
                expect(res.text).to.equal(unauthorized);
                done();
            });
    });

//===============================================================================

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .get('/role')
        .reply(200, resultAllGet);

    it('should reply with HTTP status code 401 when getting all roles with no email header set', function(done) {
        request(url)
            .get('/api/role')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()
            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist
                expect(res).to.exist;                
                expect(res.status).to.equal(401);
                expect(res.text).to.equal(unauthorized);
                done();
            });
    });


//===============================================================================

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .get('/role')
        .reply(200, resultAllGet);

    it('should reply with HTTP status code 401 when getting all roles with an incorrent email header set', function(done) {
        request(url)
            .get('/api/role')
            .set('x-forwarded-email', 'a@google.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()
            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist
                expect(res).to.exist;                
                expect(res.status).to.equal(401);
                expect(res.text).to.equal(unauthorized);
                done();
            });
    });
});