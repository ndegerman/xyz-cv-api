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

//===============================================================================

describe('/api/user', function() {

    var resultAllGet = [{
    "_id": "557700a57b0f141400e8ceac",
    "email": "a@softhouse.se",
    "name": "A",
    "createdAt": "2015-06-09T15:05:09.352Z",
    "updatedAt": "2015-06-09T15:05:09.352Z"
    }];

    var couchdb = nock(mockedUrl, {allowUnmocked: true})
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
});