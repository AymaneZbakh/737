cordova.define("cordova-plugin-request-review.RequestReview", function(require, exports, module) {
var exec = require('cordova/exec');

exports.requestReview = function(arg0, success, error) {
    exec(success, error, "RequestReview", "requestReview", [arg0]);
};

});
