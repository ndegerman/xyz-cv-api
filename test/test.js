var server = require('../app/server');
var assert = require('assert');
var http = require('http');
var request = require('superagent');
var request2 = require('supertest');
var expect = require('expect.js');
var url = 'localhost:9000';

describe('server', function () {
    before(function (done) {
        done();
    });

    // after(function (done) {
    //     server.close();
    //     done();
    // });
});

describe('Testing attributes:', function () {
    var id;

   //getting all attributes
    it('Getting all attributes', function(done) {
        request2(url)
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
                done();
            });
    });

    //posting an attribute
    it('Posting an attribute test1', function(done) {
        request2(url)
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
                id = res.body._id;
                done();
            });
    });

    //retrieving previously posted attribute by its id
    it('Retrieving attribute test1', function(done) {
        console.log('/api/attribute/' + id);
        request2(url)
            .get('/api/attribute/' + id)
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
                done();
            });
    });

    //delete previously posted attribute by its ids
    it('Deleting attribute test1', function(done) {
        console.log('/api/attribute/' + id);
        request2(url)
            .delete('/api/attribute/' + id)
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
                done();
            });
    });    
});