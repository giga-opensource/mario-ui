var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');
var APIUtils = require('../../utils/PriorityAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  fetchAll: function(projectId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PRIORITES_FETCH_REQUEST
    });
    APIUtils.fetchAll(projectId);
  },

  new: function(priority) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PRIORITY_NEW_REQUEST,
      priority: priority
    });
    APIUtils.priorityNew(priority);
  },

  update: function(priority) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PRIORITY_UPDATE_REQUEST
    });
    APIUtils.priorityUpdate(priority);
  },

  delete: function(priorityId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PRIORITY_DELETE_REQUEST
    });
    APIUtils.priorityDelete(priorityId);
  },
};