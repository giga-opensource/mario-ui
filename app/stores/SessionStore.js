var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _accessToken = sessionStorage.getItem('accessToken')
var _email = sessionStorage.getItem('email')
var _username = sessionStorage.getItem('username')
var _userID = sessionStorage.getItem('userID')
var _errors = [];

var SessionStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    return _accessToken ? true : false;
  },

  getAccessToken: function() {
    return _accessToken;
  },

  getEmail: function() {
    return _email;
  },

  getUserName: function() {
    return _username;
  },

  getUserID: function() {
    return _userID;
  },

  getErrors: function() {
    return _errors;
  }

});

var loginAtClient = function(action){
  if (action.json && action.json.access_token) {
    _accessToken = action.json.access_token;
    _email = action.json.email;
    _username = action.json.username;
    _userID = action.json.id;
    sessionStorage.setItem('accessToken', _accessToken);
    sessionStorage.setItem('email', _email);
    sessionStorage.setItem('username', _username);
    sessionStorage.setItem('userID', _userID);
    _errors = []
  }
  if (action.errors) {
    _errors = action.errors;
  }
};

SessionStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.type) {

    case ActionTypes.LOGIN_RESPONSE:
      loginAtClient(action)
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      _email = null;
      _username = null;
      _userID = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('userID');
      SessionStore.emitChange();
      break;

    case ActionTypes.SIGNUP:
      loginAtClient(action)
      SessionStore.emitChange();
      break;

    default:
  }

  return true;
});

module.exports = SessionStore;