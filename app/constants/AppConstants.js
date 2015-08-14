var keyMirror = require('keymirror');
var APIRoot = document.location.hostname == "localhost" ? "http://localhost:3000" : "http://mario-api.gigabase.org";

module.exports = {

  APIRoot: APIRoot,

  APIEndpoints: {
    LOGIN:            APIRoot + "/users/sign_in",
    SIGNUP:         APIRoot + "/users/new",
    PROJECT_NEW:   APIRoot + "/projects",
    PROJECTS_FETCH:   APIRoot + "/projects",
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

    //User
    SIGNUP_REQUEST: null,
    SIGNUP_RESPONSE: null,

    //Project
    PROJECTS_FETCH_REQUEST: null,
    PROJECTS_FETCH_RESPONSE: null,
    PROJECT_NEW_REQUEST: null,
    PROJECT_NEW_RESPONSE: null,

    // Routes
    REDIRECT: null

  })
}