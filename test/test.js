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

describe('/api/attribute', function() {

    var resultAllGet = [{
        "_id": "557d7cbc9a81250f00194d46",
        "name": "test1",
        "createdAt": "2015-06-14T13:08:12.348Z",
        "updatedAt": "2015-06-14T13:08:12.348Z"
    }];

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
        .get('/attribute')
        .reply(200, resultAllGet);

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when making a GET request to /api/attribute', function(done) {
        request(url)
            .get('/api/attribute')
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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when making a POST request to /api/attribute', function(done) {
        request(url)
            .post('/api/attribute')
            .set('x-forwarded-email', 'anton.lundin2@softhouse.se')
            .set('x-forwarded-user', 'Anton Lundin2')
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

    //TODO: add tests for delete and get single attribute

});