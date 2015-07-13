'use strict';

var server = require('../app/server');
var request = require('supertest');
var expect = require('expect.js');
var nock = require('nock');
var config = require('config');
var msg = require('../app/utils/message.handler');
var url = 'localhost:' + config.PORT;
var mockedUrl = config.API_URL;
var fs = require('fs.extra');
var rimraf = require('rimraf');
var uploadPath = config.UPLOAD_PATH;

describe('/5 file', function() {

    afterEach(function(done) {
        nock.cleanAll();
        var names = fs.readdirSync(uploadPath);
        if (names[0]) {
            fs.unlink(uploadPath + names[0], function() {});
        }

        done();
    });

    after(function(done) {
        rimraf(uploadPath, function() {
            done();
        });
    });

    var getUserByEmailResponse = [{
        _id:'558bacd8ed289d0f00d2c5f3',
        email:'a@softhouse.se',
        name:'A',
        createdAt:'2015-06-25T07:25:12.523Z',
        updatedAt:'2015-06-25T07:25:12.523Z'
    }];

    //===============================================================================

    it('it should reply with http status code 200 and a correctly formatted string when posting a new .png file', function(done) {

        var resultPost = msg.SUCCESS_UPLOAD;

        nock(mockedUrl)
            .post('/file')
            .reply(200)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/file')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .attach('file', './test/softhouse_logotyp.png')
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(resultPost);
                done();
            });
    });

    //===============================================================================

    it('it should reply with http status code 200 and a correctly formatted string when posting a new .jpg file', function(done) {

        var resultPost = msg.SUCCESS_UPLOAD;

        nock(mockedUrl)
            .post('/file')
            .reply(200)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/file')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .attach('file', './test/softhouse_logotyp.jpg')
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(resultPost);
                done();
            });
    });

    //===============================================================================

    it('it should reply with http status code 200 and a correctly formatted string when posting a new .jpeg file', function(done) {

        var resultPost = msg.SUCCESS_UPLOAD;

        nock(mockedUrl)
            .post('/file')
            .reply(200)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/file')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .attach('file', './test/softhouse_logotyp.jpeg')
            .end(function(err, res) {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal(resultPost);
                done();
            });
    });

    //===============================================================================

    it('it should reply with http status code 415 and a correctly formatted string when posting a new file in a not allowed format', function(done) {

        var resultPost = msg.BAD_FILE_FORMAT;

        nock(mockedUrl)
            .post('/file')
            .reply(200)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/file')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .attach('file', './test/softhouse_logotyp.gif')
            .end(function(err, res) {
                expect(res.status).to.equal(415);
                expect(res.text).to.equal(resultPost);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 415 and a correctly formatted string when posting an empty file', function(done) {

        var resultNoArg = msg.BAD_FILE_FORMAT;

        nock(mockedUrl)
            .post('/file')
            .reply(200, {})

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/file')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(415);
                expect(res.error.text).to.equal(resultNoArg);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting all files', function(done) {
        var resultAllGet = [{
            _id: '557d7cbc9a81250f00194d46',
            originalName: '0147079f9730da55921a4b7fbe9641c6.png',
            generatedName: '0147079f9730da55921a4b7fbe9641c7.png',
            createAt: '2015-06-14T13:08:12.348Z',
            updatedAt: '2015-06-14T13:08:12.348Z'
        }];

        nock(mockedUrl)
            .get('/file')
            .reply(200, resultAllGet)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/file')
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

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when getting a file by its id', function(done) {
        var resultGetOne = {
            _id: '557d7cbc9a81250f00194d46',
            originalName: '0147079f9730da55921a4b7fbe9641c6.png',
            generatedName: '0147079f9730da55921a4b7fbe9641c7.png',
            createAt: '2015-06-14T13:08:12.348Z',
            updatedAt: '2015-06-14T13:08:12.348Z'
        };

        nock(mockedUrl)
            .get('/file/557d7cbc9a81250f00194d46')
            .reply(200, resultGetOne)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/file/557d7cbc9a81250f00194d46')
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

    it('should reply with HTTP status code 404 and a correctly formatted string when getting a file not in the database', function(done) {
        var resultFileNotInDb = msg.NO_SUCH_ITEM;

        nock(mockedUrl)
            .get('/file/123')
            .reply(404, resultFileNotInDb)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .get('/file/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultFileNotInDb);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 200 and a correctly formatted JSON object when deleting an existing file', function(done) {
        var resultDelete = msg.SUCCESS_DELETE;

        var resultGetOne = {
            _id: '123',
            originalName: '0147079f9730da55921a4b7fbe9641c6.png',
            generatedName: '0147079f9730da55921a4b7fbe9641c7.png',
            createAt: '2015-06-14T13:08:12.348Z',
            updatedAt: '2015-06-14T13:08:12.348Z'
        };

        nock(mockedUrl)
            .delete('/file/123')
            .reply(204, {})

            .get('/file/123')
            .reply(200, resultGetOne)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/file/123')
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
                expect(res.text).to.equal(resultDelete);
                done();
            });
    });

    //===============================================================================

    it('should reply with HTTP status code 404 and a correctly formatted string when deleting a file not in the database', function(done) {
        var resultFileNotInDb = msg.NO_SUCH_ITEM;

        var resultGetOne = {
            _id: '123',
            originalName: '0147079f9730da55921a4b7fbe9641c6.png',
            generatedName: '0147079f9730da55921a4b7fbe9641c7.png',
            createAt: '2015-06-14T13:08:12.348Z',
            updatedAt: '2015-06-14T13:08:12.348Z'
        };

        nock(mockedUrl)
            .delete('/file/123')
            .reply(404, {})

            .get('/file/123')
            .reply(404, resultFileNotInDb)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/file/123')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                expect(err).to.exist;
                expect(res).to.exist;
                expect(res.status).to.equal(404);
                expect(res.error.text).to.equal(resultFileNotInDb);
                done();
            });
    });

    //================================================================================

    it('it should upload the file to the api when posting a new .png file', function(done) {

        nock(mockedUrl)
            .post('/file')
            .reply(200)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/file')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .attach('file', './test/softhouse_logotyp.png')
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                var names = fs.readdirSync(uploadPath);
                expect(names.length).to.equal(1);
                var stats = fs.statSync(uploadPath + names[0]);
                var stats2 = fs.statSync('./test/softhouse_logotyp.png');
                expect(stats.mode).to.equal(stats2.mode);
                expect(stats.size).to.equal(stats2.size);
                expect(names[0].match('^[0-9a-f]{32}\.png$')).to.not.equal(null);
                done();
            });
    });

    //=================================================================================

    it('it should upload the file to the api when posting a new .jpeg file', function(done) {

        nock(mockedUrl)
            .post('/file')
            .reply(200)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/file')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .attach('file', './test/softhouse_logotyp.jpeg')
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                var names = fs.readdirSync(uploadPath);
                expect(names.length).to.equal(1);
                var stats = fs.statSync(uploadPath + names[0]);
                var stats2 = fs.statSync('./test/softhouse_logotyp.jpeg');
                expect(stats.mode).to.equal(stats2.mode);
                expect(stats.size).to.equal(stats2.size);
                expect(names[0].match('^[0-9a-f]{32}\.jpeg$')).to.not.equal(null);
                done();
            });
    });

    //=================================================================================

    it('it should upload the file to the api when posting a new .jpg file', function(done) {

        nock(mockedUrl)
            .post('/file')
            .reply(200)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/file')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .attach('file', './test/softhouse_logotyp.jpg')
            .end(function(err, res) {
                var names = fs.readdirSync(uploadPath);
                expect(names.length).to.equal(1);
                var stats = fs.statSync(uploadPath + names[0]);
                var stats2 = fs.statSync('./test/softhouse_logotyp.jpg');
                expect(stats.mode).to.equal(stats2.mode);
                expect(stats.size).to.equal(stats2.size);
                expect(names[0].match('^[0-9a-f]{32}\.jpg$')).to.not.equal(null);
                done();
            });
    });

    //=================================================================================

    it('it shouldn\'t upload the file to the api when posting an unallowed file', function(done) {

        nock(mockedUrl)
            .post('/file')
            .reply(200)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/file')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .attach('file', './test/softhouse_logotyp.gif')
            .end(function(err, res) {
                var names = fs.readdirSync(uploadPath);
                expect(names.length).to.equal(0);
                done();
            });
    });

    //===============================================================================

    it('shouldn\'t upload a file to the api when posting an empty file', function(done) {

        nock(mockedUrl)
            .post('/file')
            .reply(200, {})

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .post('/file')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .send()

            // end handles the response
            .end(function(err, res) {
                var names = fs.readdirSync(uploadPath);
                expect(names.length).to.equal(0);
                done();
            });
    });

    //===============================================================================

    it('should remove the file from the api when deleting an existing file', function(done) {

        var resultGetOne = {
            _id: '557d7cbc9a81250f00194d46',
            originalName: '0147079f9730da55921a4b7fbe9641c6.png',
            generatedName: '0147079f9730da55921a4b7fbe9641c7.png',
            createAt: '2015-06-14T13:08:12.348Z',
            updatedAt: '2015-06-14T13:08:12.348Z'
        };

        fs.copy('./test/softhouse_logotyp.png', uploadPath + resultGetOne.generatedName, function(error) {
            expect(error).to.equal(undefined);
        });

        nock(mockedUrl)
            .delete('/file/557d7cbc9a81250f00194d46')
            .reply(204, {})

            .get('/file/557d7cbc9a81250f00194d46')
            .reply(200, resultGetOne)

            .get('/user?email=a@softhouse.se')
            .reply(200, getUserByEmailResponse);

        request(url)
            .delete('/file/557d7cbc9a81250f00194d46')
            .set('x-forwarded-email', 'a@softhouse.se')
            .set('x-forwarded-user', 'A')
            .set('Content-Type', 'application/json')
            .send()

            // end handles the response
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                var names = fs.readdirSync(uploadPath);
                expect(names.length).to.equal(0);
                done();
            });
    });

    //===================================================================================
});
