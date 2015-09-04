var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _errors = [];
var _projects = [];
var _users = [];

var ProjectStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getProjects: function() {
    return (_projects || []);
  },

  getProject: function(id) {
    var project;
    var projects = this.getProjects();
    for(i = 0; i< projects.length; i++) {
      _project = projects[i];
      if(_project.id == id){
        project = _project;
        break;
      };
    }
    return project;
  },

  updateProject: function(project){
    var projects = this.getProjects();
    for(i = 0; i< projects.length; i++) {
      _project = projects[i];
      if(_project.id == project.id){
        _project[i] = project;
        break;
      };
    }
  },

  getUsers: function(){
    return (_users || [] );
  },
});

ProjectStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {

    case ActionTypes.PROJECTS_FETCH_RESPONSE:
      _projects = action.json
      ProjectStore.emitChange();
      break;
    case ActionTypes.PROJECT_NEW_RESPONSE:
      _projects.push(action.json);
      ProjectStore.emitChange();
      break;
    case ActionTypes.PROJECT_FETCH_USERS_RESPONSE:
      _users = action.json;
      ProjectStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = ProjectStore;