var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  reciveFetchAll: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.TRACHERS_FETCH_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveNew: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.TRACKER_NEW_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveUpate: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.TRACKER_UPDATE_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveDelete: function(json, errors) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.TRACKER_DELETE_RESPONSE,
      json: json,
      errors: errors
    });
  },

};