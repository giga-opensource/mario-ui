var keyMirror = require('keymirror');

module.exports = {

  APIRoot: APIRoot,

  APIEndpoints: {
    LOGIN:            APIRoot + "/users/sign_in",
    SIGNUP:         APIRoot + "/users/new",

    PROJECTS_FETCH:   APIRoot + "/projects",
    PROJECT_NEW:       APIRoot + "/projects",

    ISSUE_BASE:     APIRoot + "/issues",

    TRACKERS_FETCH:        APIRoot + "/trackers",
    TRACKER_NEW:        APIRoot + "/trackers",
    TRACKER_UPDATE:        APIRoot + "/trackers",
    TRACKER_DELETE:         APIRoot + "/trackers",

    PRIORITIES_FETCH:        APIRoot + "/priorities",
    PRIORITY_NEW:           APIRoot + "/priorities",
    PRIORITY_UPDATE:        APIRoot + "/priorities",
    PRIORITY_DELETE:         APIRoot + "/priorities",

    TARGET_VERSIONS_FETCH:        APIRoot + "/target_versions",
    TARGET_VERSION_NEW:           APIRoot + "/target_versions",
    TARGET_VERSION_UPDATE:        APIRoot + "/target_versions",
    TARGET_VERSION_DELETE:         APIRoot + "/target_versions",

    ACTIVITY_BASE:             APIRoot + "/activities",
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
    ISSUE_UPDATE_RESPONSE: null,
    ISSUE_UPDATE_AT_CLIENT: null,
    ISSUE_UPLOAD_REQUEST: null,
    ISSUE_UPLOAD_RESPONSE: null,
    ISSUE_FETCH_FILES_REQUEST: null,
    ISSUE_FETCH_FILES_RESPONSE: null,

    //Tracker
    TRACKERS_FETCH_REQUEST: null,
    TRACKERS_FETCH_RESPONSE: null,
    TRACKER_NEW_REQUEST: null,
    TRACKER_NEW_RESPONSE: null,
    TRACKER_UPDATE_REQUEST: null,
    TRACKER_UPDATE_RESPONSE: null,
    TRACKER_DELETE_REQUEST: null,
    TRACKER_DELETE_RESPONSE: null,

    //Priority
    PRIORITIES_FETCH_REQUEST: null,
    PRIORITIES_FETCH_RESPONSE: null,
    PRIORITY_NEW_REQUEST: null,
    PRIORITY_NEW_RESPONSE: null,
    PRIORITY_UPDATE_REQUEST: null,
    PRIORITY_UPDATE_RESPONSE: null,
    PRIORITY_DELETE_REQUEST: null,
    PRIORITY_DELETE_RESPONSE: null,

    //Target version
    TARGET_VERSIONS_FETCH_REQUEST: null,
    TARGET_VERSIONS_FETCH_RESPONSE: null,
    TARGET_VERSION_NEW_REQUEST: null,
    TARGET_VERSION_NEW_RESPONSE: null,
    TARGET_VERSION_UPDATE_REQUEST: null,
    TARGET_VERSION_UPDATE_RESPONSE: null,
    TARGET_VERSION_DELETE_REQUEST: null,
    TARGET_VERSION_DELETE_RESPONSE: null,


    //Activity

    ISSUE_FETCH_ACTIVITIES_REQUEST: null,
    ISSUE_FETCH_ACTIVITIES_RESPONSE: null,
    ISSUE_ACTIVITY_NEW_REQUEST: null,
    ISSUE_ACTIVITY_NEW_RESPONSE: null,

    // Routes
    REDIRECT: null

  })
}