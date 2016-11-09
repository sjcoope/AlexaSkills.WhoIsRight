// Third party modules
var alexa = require('alexa-app');
var ssml = require('./refs/ssml');
var chai = require('chai');
var should = chai.should();

// App modules
var intentHandler = require('../src/intentHandler');
var prompts = require('../src/prompts');

describe('intentHandler', function() {
    describe('on launch', function() {
        // Trigger the launch function
        var response = new alexa.response();
        var request = {};
        intentHandler.launch(request, response);

        // Get the speech response
        var speechResponse = response.response.response;
        var prompt = speechResponse.outputSpeech;
        var reprompt = speechResponse.reprompt.outputSpeech;

        it('should have correct prompt', function () {
            should.exist(prompt);
            prompt.type.should.equal('SSML');

            var expected = ssml.fromStr(prompts.launch.prompt)
            prompt.ssml.should.equal(expected);
        });

        it('should have correct reprompt', function () {
            should.exist(reprompt);
            reprompt.type.should.equal('SSML');

            var expected = ssml.fromStr(prompts.launch.reprompt);
            reprompt.ssml.should.equal(expected);
        });
    });

    describe('On error', function() {
        // Trigger the error function
        var response = new alexa.response();
        var request = {};
        var exception = {};
        intentHandler.error(exception, request, response);

        // Get the speech response
        var speechResponse = response.response.response;
        var prompt = speechResponse.outputSpeech;
        console.log('speechResponse', speechResponse);

        it('should have correct prompt', function () {
            should.exist(prompt);
            prompt.type.should.equal('SSML');

            var expected = ssml.fromStr(prompts.error.prompt);
            prompt.ssml.should.equal(expected);
        });
    });

    describe('On stop', function() {
        // Trigger the stop function
        var response = new alexa.response();
        var request = {};
        intentHandler.stop(request, response);

        // Get the speech response
        var speechResponse = response.response.response;
        var prompt = speechResponse.outputSpeech;
        console.log('speechResponse', speechResponse);

        it('should have correct prompt', function () {
            should.exist(prompt);
            prompt.type.should.equal('SSML');

            var expected = ssml.fromStr(prompts.stop.prompt);
            prompt.ssml.should.equal(expected);
        });
    });

    describe('On help', function() {
        // Trigger the help function
        var response = new alexa.response();
        var request = {};
        intentHandler.help(request, response);

        // Get the speech response
        var speechResponse = response.response.response;
        var prompt = speechResponse.outputSpeech;
        console.log('speechResponse', speechResponse);

        it('should have correct prompt', function () {
            should.exist(prompt);
            prompt.type.should.equal('SSML');

            var expected = ssml.fromStr(prompts.help.prompt);
            prompt.ssml.should.equal(expected);
        });
    });

    describe('On cancel', function() {
        // Trigger the error function
        var response = new alexa.response();
        var request = {};
        intentHandler.cancel(request, response);

        // Get the speech response
        var speechResponse = response.response.response;
        var prompt = speechResponse.outputSpeech;
        console.log('speechResponse', speechResponse);

        it('should have correct prompt', function () {
            should.exist(prompt);
            prompt.type.should.equal('SSML');

            var expected = ssml.fromStr(prompts.cancel.prompt);
            prompt.ssml.should.equal(expected);
        });
    });

    describe('On whoIsRight', function() {
        var response = new alexa.response();

        context('when firstPerson slot is empty', function() {
            it('should have correct prompt', function() {
                false.should.equal(true);
            });

            it('should have correct reprompt', function() {
                false.should.equal(true);
            });
        });

        context('when secondPerson slot is empty', function() {
            it('should have correct prompt', function() {
                false.should.equal(true);
            });

            it('should have correct reprompt', function() {
                false.should.equal(true);
            });
        });

        context('when firstPerson and secondPerson slots are supplied', function() {
            it('should have correct prompt', function() {
                false.should.equal(true);
            });

            it('should have correct reprompt', function() {
                false.should.equal(true);
            });
        });
    });
})