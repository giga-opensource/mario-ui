var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveSignup: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.SINGUP_RESPONSE,
      json: json,
      errors: errors
    });
  },

};