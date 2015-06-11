var server = require('../app/server');
var assert = require('assert');
var http = require('http');
var request = require('superagent');
var request2 = require('supertest');
var expect = require('expect.js');
var url = 'localhost:9000';

//npm install mocha, superagent, supertest, expect.js

describe('server', function () {
    before(function (done) {
        done();
    });

    // after(function (done) {
    //     server.close();
    //     done();
    // });
});

describe('/api/attribute', function () {
    var id;

   //getting all attributes
    it('should reply with HTTP status code 200 when the correct email and ' + 
        'user headers are set', function(done) {
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
    it('should respond with a correctly formatted json object containing the posted attribute "test1"', function(done) {
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
                expect(Object.keys(res.body).length).to.equal(4);

                expect(res.body).to.have.key('createdAt');
                expect(res.body).to.have.key('updatedAt');
                expect(res.body).to.have.key('_id');
                expect(res.body).to.have.key('name');

                expect(res.body.name).to.equal('test1');
                expect("0x" + res.body._id).to.be.within(0, Infinity);

                id = res.body._id;
                done();
            });
    });

    //retrieving previously posted attribute by its id
    it('should respond with a correctly formatted json object containing the previously posted attribute "test1"', function(done) {
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
                expect(Object.keys(res.body).length).to.equal(4);

                expect(res.body).to.have.key('createdAt');
                expect(res.body).to.have.key('updatedAt');
                expect(res.body).to.have.key('_id');
                expect(res.body).to.have.key('name');

                expect(res.body.name).to.equal('test1');
                expect("0x" + res.body._id).to.be.within(0, Infinity);
                expect(res.body._id).to.equal(id);

                done();
            });
    });

    //delete previously posted attribute by its ids
    it('should respond with HTTP status code 200 after deleting attribute "test1"', function(done) {
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
                expect(res.body).to.have.key('message');
                expect(res.body.key).to.equal('The attribute was successfully deleted');
                done();
            });
    });    
});