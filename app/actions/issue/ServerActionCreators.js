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

  reciveFetchIssue: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ISSUE_FETCH_RESPONSE,
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

  receiveUpate: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ISSUE_UPDATE_RESPONSE,
      json: json,
      errors: errors
    });
  },

};