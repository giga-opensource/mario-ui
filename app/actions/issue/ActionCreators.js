var AppDispatcher = require('../../dispatcher/AppDispatcher.js');
var AppConstants = require('../../constants/AppConstants.js');
var APIUtils = require('../../utils/IssueAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  fetchAll: function(projectId, params) {
    params = params ? params : {} ;
    AppDispatcher.handleViewAction({
      type: ActionTypes.ISSUES_FETCH_REQUEST
    });
    APIUtils.fetchAll(projectId, params);
  },

  fetchIssue: function(issueId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ISSUE_FETCH_REQUEST
    });
    APIUtils.fetchIssue(issueId);
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

  uploadFiles: function(issueId, files) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ISSUE_UPLOAD_REQUEST
    });
    APIUtils.issueUploadFiles(issueId, files);
  },

  fetchFiles: function(issueId) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.ISSUE_FETCH_FILES_REQUEST
    });
    APIUtils.issueFetchFiles(issueId);
  },
};