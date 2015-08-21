var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _target_versions = []

var TargetVersionStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  setTargetVersions: function(target_versions){
    _target_versions = target_versions
  },

  getTargetVersions: function() {
    return (_target_versions || []);
  },

  getTargetVersion: function(id) {
    var version;
    var versions = this.getTargetVersions();
    for(i = 0; i< versions.length; i++) {
      _version = versions[i];
      if(_version.id == id){
        version = _version;
        break;
      };
    }
    return version;
  },

  updateTargetVersion: function(version){
    var versions = this.getTargetVersions();
    for(i = 0; i< versions.length; i++) {
      _version = versions[i];
      if(_version.id == version.id){
        target = versions[i];
        _target_versions[i] = assign(target, version);
        break;
      };
    }
  },

  deleteTargetVersion: function(version){
    var versions = this.getTargetVersions();
    for(i = 0; i< versions.length; i++) {
      _version = versions[i];
      if(_version.id == version.id){
        _target_versions.splice(i,1);
        break;
      };
    }
  },

});

TargetVersionStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {
    case ActionTypes.TARGET_VERSIONS_FETCH_RESPONSE:
      _target_versions = action.json
      TargetVersionStore.emitChange();
      break;
    case ActionTypes.TARGET_VERSION_NEW_RESPONSE:
      if(action.json){
        _target_versions.push(action.json);
      }
      TargetVersionStore.emitChange();
      break;
    case ActionTypes.TARGET_VERSION_UPDATE_RESPONSE:
      TargetVersionStore.updateTargetVersion(action.json);
      TargetVersionStore.emitChange();
      break;

    case ActionTypes.TARGET_VERSION_DELETE_RESPONSE:
      TargetVersionStore.deleteTargetVersion(action.json);
      TargetVersionStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = TargetVersionStore;