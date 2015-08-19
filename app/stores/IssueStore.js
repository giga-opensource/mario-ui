var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _issues = []
var _projectId;

var IssueStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getIssues: function() {
    return (_issues || []);
  },

  getIssue: function(id) {
    var issue;
    var issues = this.getIssues();
    for(i = 0; i< issues.length; i++) {
      _issue = issues[i];
      if(_issue.id == id){
        issue = _issue;
        break;
      };
    }
    return issue;
  },

  updateIssue: function(issue){
    var issues = this.getIssues();
    for(i = 0; i< issues.length; i++) {
      _issue = issues[i];
      if(_issue.id == issue.id){
        _issues[i] = issue;
        break;
      };
    }
  },

  getProject: function() {
    return _projectId;
  },

  setProject: function(projectId) {
    _projectId = projectId;
  },

});

IssueStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {

    case ActionTypes.ISSUES_FETCH_RESPONSE:
      _issues = action.json
      IssueStore.emitChange();
      break;
    case ActionTypes.ISSUE_NEW_RESPONSE:
      _issues.push(action.json);
      IssueStore.emitChange();
      break;
    case ActionTypes.ISSUE_UPDATE_RESPONSE:
      IssueStore.updateIssue(action.json);
      IssueStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = IssueStore;