var keyMirror = require('keymirror');
var APIRoot = document.location.hostname == "localhost" ? "http://localhost:3000" : "http://mario-api.gigabase.org";

module.exports = {

  APIRoot: APIRoot,

  APIEndpoints: {
    LOGIN:            APIRoot + "/users/sign_in",
    SIGNUP:         APIRoot + "/users/new",

    PROJECTS_FETCH:   APIRoot + "/projects",
    PROJECT_NEW:   APIRoot + "/projects",

    ISSUES_FETCH:   APIRoot + "/issues",
    ISSUE_FETCH:   APIRoot + "/issues",
    ISSUE_NEW:      APIRoot + "/issues",
    ISSUE_UPDATE:      APIRoot + "/issues",

    TRACKERS_FETCH:        APIRoot + "/trackers",
    TRACKER_NEW:        APIRoot + "/trackers",
    TRACKER_UPDATE:        APIRoot + "/trackers",
    TRACKER_DELETE:         APIRoot + "/trackers",
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

    //Issue
    ISSUES_FETCH_REQUEST: null,
    ISSUES_FETCH_RESPONSE: null,
    ISSUE_FETCH_REQUEST: null,
    ISSUE_FETCH_RESPONSE: null,
    ISSUE_NEW_REQUEST: null,
    ISSUE_NEW_RESPONSE: null,
    ISSUE_UPDATE_REQUEST: null,
    ISSUE_UPDATE_RESPONSE: null,

    //Tracker
    TRACKERS_FETCH_REQUEST: null,
    TRACKERS_FETCH_RESPONSE: null,
    TRACKER_NEW_REQUEST: null,
    TRACKER_NEW_RESPONSE: null,
    TRACKER_UPDATE_REQUEST: null,
    TRACKER_UPDATE_RESPONSE: null,
    TRACKER_DELETE_REQUEST: null,
    TRACKER_DELETE_RESPONSE: null,

    // Routes
    REDIRECT: null

  })
}