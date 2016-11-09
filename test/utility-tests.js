// Third party modules
var chai = require('chai');
var should = chai.should();

// App modules
var index = require('../src/index');
var prompts = require('../src/prompts');

describe('utility', function() {
    var utility = require("../src/utility");

    context('string.format with string and a single parameter', function() {
        var input = "Test: {0}";

        it('should format correctly', function() {
            var actual = utility.string.format(input, "one");
            actual.should.equal("Test: one");
        });
    });

    context('string.format with string and multiple parameters', function() {
        var input = "Test: {0} - Test: {1}";

        it("should format correctly", function() {
            var actual = utility.string.format(input, "one", "two");
            actual.should.equal("Test: one - Test: two");
        });
    });
});