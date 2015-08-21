var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _trackers = []

var TrackerStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  setTrackers: function(trackers){
    _trackers = trackers
  },

  getTrackers: function() {
    return (_trackers || []);
  },

  getTracker: function(id) {
    var tracker;
    var trackers = this.getTrackers();
    for(i = 0; i< trackers.length; i++) {
      _tracker = trackers[i];
      if(_tracker.id == id){
        tracker = _tracker;
        break;
      };
    }
    return tracker;
  },

  updateTracker: function(tracker){
    var trackers = this.getTrackers();
    for(i = 0; i< trackers.length; i++) {
      _tracker = trackers[i];
      if(_tracker.id == tracker.id){
        target = trackers[i];
        _trackers[i] = assign(target, tracker);
        break;
      };
    }
  },

  deleteTracker: function(tracker){
    var trackers = this.getTrackers();
    for(i = 0; i< trackers.length; i++) {
      _tracker = trackers[i];
      if(_tracker.id == tracker.id){
        _trackers.splice(i,1);
        break;
      };
    }
  },

});

TrackerStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {
    case ActionTypes.TRACKERS_FETCH_RESPONSE:
      _trackers = action.json
      TrackerStore.emitChange();
      break;
    case ActionTypes.TRACKER_NEW_RESPONSE:
      if(action.json){
        _trackers.push(action.json);
      }
      TrackerStore.emitChange();
      break;
    case ActionTypes.TRACKER_UPDATE_RESPONSE:
      TrackerStore.updateTracker(action.json);
      TrackerStore.emitChange();
      break;

    case ActionTypes.TRACKER_DELETE_RESPONSE:
      TrackerStore.deleteTracker(action.json);
      TrackerStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = TrackerStore;