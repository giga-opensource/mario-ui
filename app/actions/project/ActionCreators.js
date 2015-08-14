var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');
var APIUtils = require('../../utils/ProjectAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  fetchAll: function() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PROJECTS_FETCH_REQUEST
    });
    APIUtils.fetchAll();
  },

  new: function(project) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PROJECT_NEW_REQUEST,
      project: project
    });
    APIUtils.projectNew(project);
  },
};