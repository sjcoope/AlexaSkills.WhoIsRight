"use strict";

var prompts = {
    launch : {
        prompt: "Welcome to Who Is Right?  You can ask me a question like, who is right, is it Simon or Claire? ... Now, how can I help?",
        reprompt: "For instructions on what you can say, please say help me."
    },
    error : {
            prompt: "I'm sorry, something has gone wrong.  Would you mind trying again?"
    },
    help : {
        prompt: "You can ask me a question like, who is right, is it Simon or Claire?"
    },
    cancel : {
        prompt: "Goodbye"
    },
    stop : {
        prompt: "Goodbye"
    },
    intents : {
        whoIsRight : {
            notUnderstood : {
                prompt : "Sorry, I didn't understand that question.  Could you try again?",
                reprompt: "Could you try again please?"
            },
            success : {
                reprompt: "Don't you want to know who is right?"
            },
            responses : [
                "Hmm ... This is a tricky one ... But I think {0} is right this time!",
                "I think it's time {0} was right for once!",
                "Well ... we all know {1} can be a little righteous.  But {0} is right this time!",
                "It's {0} all the way!",
                "Well ... I think you're both wrong ... but as I have to pick someone I'll go with {0}.",
                "I think {0} is right.",
                "I think {1} is wrong, so that means {0} is right.",
                "Hmm ... As {1} is scowling at me I'll pick {0}.",
                "I know you've both had a bad day ... but it's got worse for {1} because I think {0} is right.",
            ]
        }
    }
};

module.exports = prompts;