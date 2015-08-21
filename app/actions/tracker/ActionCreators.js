var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');
var APIUtils = require('../../utils/TrackerAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  fetchAll: function(projectId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TRACHERS_FETCH_REQUEST
    });
    APIUtils.fetchAll(projectId);
  },

  new: function(tracker) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TRACKER_NEW_REQUEST,
      tracker: tracker
    });
    APIUtils.trackerNew(tracker);
  },

  update: function(tracker) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TRACKER_UPDATE_REQUEST
    });
    APIUtils.trackerUpdate(tracker);
  },

  delete: function(trackerId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TRACKER_DELETE_REQUEST
    });
    APIUtils.trackerDelete(trackerId);
  },
};