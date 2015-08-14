var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  reciveFetchAll: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ISSUES_FETCH_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveNew: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ISSUE_NEW_RESPONSE,
      json: json,
      errors: errors
    });
  },

};