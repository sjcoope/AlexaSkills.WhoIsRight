var utility = {
        string : {
            format : function(format) {
                var args = Array.prototype.slice.call(arguments, 1);
                return format.replace(/{(\d+)}/g, function(match, number) { 
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        }
    },
    nullConditional : function(firstValue, secondValue) {
        if(firstValue == null){
            return secondValue;
        }
        return firstValue;
    }
};

module.exports = utility;