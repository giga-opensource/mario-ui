var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');
var APIUtils = require('../../utils/StatusAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  fetchAll: function(projectId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.STATUSES_FETCH_REQUEST
    });
    APIUtils.fetchAll(projectId);
  },

  new: function(status) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.STATUS_NEW_REQUEST,
      status: status
    });
    APIUtils.statusNew(status);
  },

  update: function(status) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.STATUS_UPDATE_REQUEST
    });
    APIUtils.statusUpdate(status);
  },

  delete: function(statusId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.STATUS_DELETE_REQUEST
    });
    APIUtils.statusDelete(statusId);
  },
};