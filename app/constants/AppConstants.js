var keyMirror = require('keymirror');
var APIRoot = document.location.hostname == "localhost" ? "http://localhost:3000" : "http://mario-api.gigabase.org";

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