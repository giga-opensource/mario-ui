var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  reciveFetchAll: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.PRIORITES_FETCH_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveNew: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.PRIORITY_NEW_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveUpate: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.PRIORITY_UPDATE_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveDelete: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.PRIORITY_DELETE_RESPONSE,
      json: json,
      errors: errors
    });
  },

};