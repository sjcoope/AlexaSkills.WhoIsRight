// Third party modules
var alexa = require('alexa-app');
var ssml = require('./refs/ssml');
var chai = require('chai');
var should = chai.should();

// App modules
var intentHandler = require('../src/intentHandler');
var prompts = require('../src/prompts');
var utility = require('../src/utility');

// Required for building requests in full intent tests.
var requestData = { 
    "version": "1.0",
    "session": {
        "new": false,
        "sessionId": "amzn1.echo-api.session.abeee1a7-aee0-41e6-8192-e6faaed9f5ef",
        "application": {
        "applicationId": "amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe"
        },
        "attributes": {},
        "user": {
        "userId": "amzn1.account.AM3B227HF3FAM1B261HK7FFM3A2"
        }
    },
    "request": {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.6919844a-733e-4e89-893a-fdcb77e2ef0d",
        "timestamp": "2015-05-13T12:34:56Z",
        "intent": {}
    }
};

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

        it('should have a prompt', function () {
            should.exist(prompt);
            prompt.type.should.equal('SSML');
        });

        it('should have correct "launch" prompt', function () {
            var expected = ssml.fromStr(prompts.launch.prompt)
            prompt.ssml.should.equal(expected);
        });

        it('should have a reprompt', function () {
            should.exist(reprompt);
            reprompt.type.should.equal('SSML');
        });

        it('should have correct "launch" reprompt', function () {
            var expected = ssml.fromStr(prompts.launch.reprompt);
            reprompt.ssml.should.equal(expected);
        });
    });

    describe('On error', function() {
        // Copy the request data to prevent changes affecting other tests
        var requestDataCopy = JSON.parse(JSON.stringify(requestData));

        // Trigger the error function
        var response = new alexa.response();
        var request = new alexa.request(requestDataCopy);
        var exception = {};
        intentHandler.error(exception, request, response);

        // Get the speech response
        var speechResponse = response.response.response;
        var prompt = speechResponse.outputSpeech;

        it('should have a prompt', function () {
            should.exist(prompt);
            prompt.type.should.equal('SSML');
        });

        it('should have correct "error" prompt', function () {
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

        it('should have a prompt', function () {
            should.exist(prompt);
            prompt.type.should.equal('SSML');
        });

        it('should have correct "stop" prompt', function () {
            var expected = ssml.fromStr(prompts.stop.prompt);
            prompt.ssml.should.equal(expected);
        });
    });

    describe('On help', function() {
        // Copy the request data to prevent changes affecting other tests
        var requestDataCopy = JSON.parse(JSON.stringify(requestData));

        // Trigger the help function
        var response = new alexa.response();
        var request = new alexa.request(requestDataCopy);
        intentHandler.help(request, response);

        // Get the speech response
        var speechResponse = response.response.response;
        var prompt = speechResponse.outputSpeech;

        it('should have a prompt', function () {
            should.exist(prompt);
            prompt.type.should.equal('SSML');
        });

        it('should have correct "help" prompt', function () {
            var expected = ssml.fromStr(prompts.help.prompt);
            prompt.ssml.should.equal(expected);
        });
    });

    describe('On cancel', function() {
        // Trigger the cancel function
        var response = new alexa.response();
        var request = {};
        intentHandler.cancel(request, response);
        
        // Get the speech response
        var speechResponse = response.response.response;
        var prompt = speechResponse.outputSpeech;

        it('should have a prompt', function () {
            should.exist(prompt);
            prompt.type.should.equal('SSML');
        });

        it('should have correct "cancel" prompt', function () {
            var expected = ssml.fromStr(prompts.cancel.prompt);
            prompt.ssml.should.equal(expected);
        });
    });

    describe('On whoIsRight', function() {
        context('when firstPerson slot is empty', function() {
            // Copy the request data and set slot info
            var requestDataCopy = JSON.parse(JSON.stringify(requestData));
            requestDataCopy.request.intent = {
                "name": "WhoIsRight",
                "slots": {
                    "SecondPerson": {
                        "value": "Jim",
                        "name": "SecondPerson"
                    }
                }
            };

            // Create the request and response, then trigger the intent
            var response = new alexa.response();
            var request = new alexa.request(requestDataCopy);
            intentHandler.whoIsRight(request, response);

            // Get the speech response
            var speechResponse = response.response.response;
            var prompt = speechResponse.outputSpeech;
            var reprompt = speechResponse.reprompt.outputSpeech;

            it('should have a prompt', function() {
                should.exist(prompt);
                prompt.type.should.equal('SSML');
            });

            it('should have "not understood" prompt', function() {
                var expected = ssml.fromStr(prompts.intents.whoIsRight.notUnderstood.prompt);
                prompt.ssml.should.equal(expected);
            });

            it('should have a reprompt', function() {
                should.exist(prompt);
                reprompt.type.should.equal('SSML');
            });

            it('should have "not understood" reprompt', function() {
                var expected = ssml.fromStr(prompts.intents.whoIsRight.notUnderstood.reprompt);
                reprompt.ssml.should.equal(expected);
            });
        });

        context('when secondPerson slot is empty', function() {
            // Copy the request data and set slot info
            var requestDataCopy = JSON.parse(JSON.stringify(requestData));
            requestDataCopy.request.intent = {
                "name": "WhoIsRight",
                "slots": {
                    "FirstPerson": {
                        "value": "Bob",
                        "name": "FirstPerson"
                    }
                }
            };

            // Create the request and response, then trigger the intent
            var response = new alexa.response();
            var request = new alexa.request(requestDataCopy);
            intentHandler.whoIsRight(request, response);

            // Get the speech response
            var speechResponse = response.response.response;
            var prompt = speechResponse.outputSpeech;
            var reprompt = speechResponse.reprompt.outputSpeech;

            it('should have a prompt', function() {
                should.exist(prompt);
                prompt.type.should.equal('SSML');
            });

            it('should have "not understood" prompt', function() {
                var expected = ssml.fromStr(prompts.intents.whoIsRight.notUnderstood.prompt);
                prompt.ssml.should.equal(expected);
            });

            it('should have a reprompt', function() {
                should.exist(prompt);
                reprompt.type.should.equal('SSML');
            });

            it('should have "not understood" reprompt', function() {
                var expected = ssml.fromStr(prompts.intents.whoIsRight.notUnderstood.reprompt);
                reprompt.ssml.should.equal(expected);
            });
        });

        context('when firstPerson and secondPerson slots are supplied', function() {
            // Copy the request data and set slot info
            var firstPersonName = "Bob";
            var secondPersonName = "Jim";
            var requestDataCopy = JSON.parse(JSON.stringify(requestData));
            requestDataCopy.request.intent = {
                "name": "WhoIsRight",
                "slots": {
                    "FirstPerson": {
                        "value": firstPersonName,
                        "name": "FirstPerson"
                    },
                    "SecondPerson": {
                        "value": secondPersonName,
                        "name": "SecondPerson"
                    }
                }
            };

            // Create the request and response, then trigger the intent
            var response = new alexa.response();
            var request = new alexa.request(requestDataCopy);
            intentHandler.whoIsRight(request, response);

            // Get the speech response
            var speechResponse = response.response.response;
            var prompt = speechResponse.outputSpeech;
            var reprompt = speechResponse.reprompt.outputSpeech;
            
            it('should have a prompt', function() {
                should.exist(prompt);
                prompt.type.should.equal('SSML');
            });

            it('should have a random success prompt', function() {
                // Generate list of all prompts for both first and second person (as winner is selected at random)
                var possiblePrompts = [];
                for(var i = 0; i < prompts.intents.whoIsRight.responses.length; i++)
                {
                    var response = prompts.intents.whoIsRight.responses[i];
                    possiblePrompts.push(ssml.fromStr(utility.string.format(response, firstPersonName, secondPersonName)));
                    possiblePrompts.push(ssml.fromStr(utility.string.format(response, secondPersonName, firstPersonName)));
                }

                possiblePrompts.should.include(prompt.ssml)
            });

            it('should have a reprompt', function() {
                should.exist(prompt);
                reprompt.type.should.equal('SSML');
            });

            it('should have "success" reprompt', function() {
                var expected = ssml.fromStr(prompts.intents.whoIsRight.success.reprompt);
                reprompt.ssml.should.equal(expected);
            });
        });
    });
})