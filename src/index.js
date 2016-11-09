'use strict';

var alexa = require('alexa-app');
var app = new alexa.app('whoisright');
var intentHandler = require('./intentHandler');

app.intent('WhoIsRight', {
    'slots': {
        'FirstPerson': 'LIST_OF_NAMES',
        'SecondPerson': 'LIST_OF_NAMES'
    },
    'utterances': [
        '{FirstPerson} or {SecondPerson}',
        '{FirstPerson} all {SecondPerson}',
        'is it {FirstPerson} or {SecondPerson}',
        'is it {FirstPerson} all {SecondPerson}',
        '#who is right {FirstPerson} or {SecondPerson}',
        'who has the best idea {FirstPerson} or {SecondPerson}'
    ],
}, intentHandler.whoIsRight);

app.launch(intentHandler.launch);
app.error = intentHandler.error;
app.intent('AMAZON.HelpIntent', intentHandler.help);
app.intent('AMAZON.StopIntent', intentHandler.stop);
app.intent('AMAZON.CancelIntent', intentHandler.cancel);

module.exports = app;