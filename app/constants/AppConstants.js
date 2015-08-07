var keyMirror = require('keymirror');
var APIRoot = "http://localhost:3000";

module.exports = {

  APIRoot: APIRoot,

  APIEndpoints: {
    LOGIN:            APIRoot + "/users/sign_in",
    SIGNUP:        APIRoot + "/users/new",
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

   ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,
    LOGOUT: null,

    SIGNUP_REQUEST: null,
    SIGNUP_RESPONSE: null,


    // Routes
    REDIRECT: null

  })
}