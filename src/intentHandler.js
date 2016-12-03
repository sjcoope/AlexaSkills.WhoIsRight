var prompts = require('./prompts');
var utility = require('./utility');

var intentHandler = {};
var shouldEndSessionKey = "ShouldEndSessionKey";
var shouldEndSessionDefault = true;

intentHandler.launch = function (request, response) {
    // We've launched the skill, so session should not end until cancel/stop/whoIsRight intent is called
    response.session(shouldEndSessionKey, false);
    response.say(prompts.launch.prompt).reprompt(prompts.launch.reprompt).shouldEndSession(false);
};

intentHandler.whoIsRight = function(request, response) {
    var prompt, reprompt;
    var firstPersonName = request.slot('FirstPerson', null);
    var secondPersonName = request.slot('SecondPerson', null);

    if(firstPersonName && secondPersonName){
        // Select who is right at random
        var winner = Math.floor((Math.random() * 10) + 1) <= 5 ? firstPersonName : secondPersonName;
        var loser = winner == firstPersonName ? secondPersonName : firstPersonName;

        // Build the response
        var responses = prompts.intents.whoIsRight.responses;
        var responseIndex = Math.floor((Math.random() * responses.length) + 0);
        var responsePrompt = responses[responseIndex];
        prompt = utility.string.format(responsePrompt, winner, loser);
        reprompt = prompts.intents.whoIsRight.success.reprompt;
    } else {
        prompt = prompts.intents.whoIsRight.notUnderstood.prompt;
        reprompt = prompts.intents.whoIsRight.notUnderstood.reprompt;
    }
    
    response.say(prompt).reprompt(reprompt).shouldEndSession(true);
};

intentHandler.help = function(request, response) {
    var shouldEndSession = utility.nullConditional(request.session(shouldEndSessionKey), shouldEndSessionDefault);
    response.say(prompts.help.prompt).shouldEndSession(shouldEndSession);
};

intentHandler.error = function(exception, request, response) {
    var shouldEndSession = utility.nullConditional(request.session(shouldEndSessionKey), shouldEndSessionDefault);
    response.say(prompts.error.prompt).shouldEndSession(shouldEndSession);
};

intentHandler.stop = function(request, response) {
    response.say(prompts.stop.prompt).shouldEndSession(true);
};

intentHandler.cancel = function(request, response) {
    response.say(prompts.cancel.prompt).shouldEndSession(true);
};

module.exports = intentHandler;