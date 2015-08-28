var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _statuses = []

var StatusStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  setStatuses: function(statuses){
    _statuses = statuses
  },

  getStatuses: function() {
    return (_statuses || []);
  },

  getStatus: function(id) {
    var status;
    var statuses = this.getStatuses();
    for(i = 0; i< statuses.length; i++) {
      _status = statuses[i];
      if(_status.id == id){
        status = _status;
        break;
      };
    }
    return status;
  },

  updateStatus: function(status){
    var statuses = this.getStatuses();
    for(i = 0; i< statuses.length; i++) {
      _status = statuses[i];
      if(_status.id == status.id){
        _statuses[i] = assign(_status, status);
        break;
      };
    }
  },

  deleteStatus: function(status){
    var statuses = this.getStatuses();
    for(i = 0; i< statuses.length; i++) {
      _status = statuses[i];
      if(_status.id == status.id){
        _statuses.splice(i,1);
        break;
      };
    }
  },

});

StatusStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {
    case ActionTypes.STATUSES_FETCH_RESPONSE:
      _statuses = action.json
      StatusStore.emitChange();
      break;
    case ActionTypes.STATUS_NEW_RESPONSE:
      if(action.json){
        _statuses.push(action.json);
      }
      StatusStore.emitChange();
      break;
    case ActionTypes.STATUS_UPDATE_RESPONSE:
      StatusStore.updateStatus(action.json);
      StatusStore.emitChange();
      break;
    case ActionTypes.STATUS_DELETE_RESPONSE:
      StatusStore.deleteStatus(action.json);
      StatusStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = StatusStore;