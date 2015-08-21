var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _priorities = []

var PriorityStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  setPriorities: function(priorities){
    _priorities = priorities
  },

  getPriorities: function() {
    return (_priorities || []);
  },

  getPriority: function(id) {
    var priority;
    var priorities = this.getPriorities();
    for(i = 0; i< priorities.length; i++) {
      _priority = priorities[i];
      if(_priority.id == id){
        priority = _priority;
        break;
      };
    }
    return priority;
  },

  updatePriority: function(priority){
    var priorities = this.getPriorities();
    for(i = 0; i< priorities.length; i++) {
      _priority = priorities[i];
      if(_priority.id == priority.id){
        target = priorities[i];
        _priorities[i] = assign(target, priority);
        break;
      };
    }
  },

  deletePriority: function(priority){
    var priorities = this.getPriorities();
    for(i = 0; i< priorities.length; i++) {
      _priority = priorities[i];
      if(_priority.id == priority.id){
        _priorities.splice(i,1);
        break;
      };
    }
  },

});

PriorityStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {
    case ActionTypes.PRIORITES_FETCH_RESPONSE:
      _priorities = action.json
      PriorityStore.emitChange();
      break;
    case ActionTypes.PRIORITY_NEW_RESPONSE:
      if(action.json){
        _priorities.push(action.json);
      }
      PriorityStore.emitChange();
      break;
    case ActionTypes.PRIORITY_UPDATE_RESPONSE:
      PriorityStore.updatePriority(action.json);
      PriorityStore.emitChange();
      break;

    case ActionTypes.PRIORITY_DELETE_RESPONSE:
      PriorityStore.deletePriority(action.json);
      PriorityStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = PriorityStore;