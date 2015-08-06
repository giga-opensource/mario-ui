var keyMirror = require('keymirror');
var APIRoot = "http://localhost:3000";

module.exports = {

  APIRoot: APIRoot,

  APIEndpoints: {
    LOGIN:            APIRoot + "/users/sign_in",
    LOGIN_OUT:        APIRoot + "/users/sign_out"
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

    // Routes
    REDIRECT: null

  })
}