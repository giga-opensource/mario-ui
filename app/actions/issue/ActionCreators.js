var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');
var APIUtils = require('../../utils/IssueAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  fetchAll: function(projectId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ISSUES_FETCH_REQUEST
    });
    APIUtils.fetchAll(projectId);
  },

  new: function(issue) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ISSUE_NEW_REQUEST,
      issue: issue
    });
    APIUtils.issueNew(issue);
  },

  update: function(issue) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ISSUE_UPDATE_REQUEST
    });
    APIUtils.issueUpdate(issue);
  },
};