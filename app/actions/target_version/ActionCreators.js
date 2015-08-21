var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');
var APIUtils = require('../../utils/TargetVersionAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  fetchAll: function(projectId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TARGET_VERSIONS_FETCH_REQUEST,
    });
    APIUtils.fetchAll(projectId);
  },

  new: function(target_version) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TARGET_VERSION_NEW_REQUEST,
      target_version: target_version
    });
    APIUtils.targetVersionNew(target_version);
  },

  update: function(target_version) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TARGET_VERSION_UPDATE_REQUEST
    });
    APIUtils.targetVersionUpdate(target_version);
  },

  delete: function(versionId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TARGET_VERSION_DELETE_REQUEST
    });
    APIUtils.targetVersionDelete(versionId);
  },
};