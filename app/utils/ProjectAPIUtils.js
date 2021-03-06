var ProjectServerActionCreators = require('../actions/project/ServerActionCreators.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');

module.exports = {

  fetchAll: function() {
    request.get(AppConstants.APIEndpoints.PROJECTS_FETCH)
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            ProjectServerActionCreators.reciveFetchAll(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ProjectServerActionCreators.reciveFetchAll(json, null);
          }
        }
      });
  },

  projectNew: function(project){
    request.post(AppConstants.APIEndpoints.PROJECT_NEW)
      .send({project: project})
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            ProjectServerActionCreators.receiveNew(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ProjectServerActionCreators.receiveNew(json, null);
          }
        }
      });
  },

  projectFetchUsers: function(projectId) {
    requestUrl = AppConstants.APIEndpoints.PROJECTS_FETCH + '/' + projectId + '/users';
    request.get(requestUrl)
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            ProjectServerActionCreators.reciveFetchUsers(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ProjectServerActionCreators.reciveFetchUsers(json, null);
          }
        }
      });

  },

  _accessToken: function() {
    return(sessionStorage.getItem('accessToken'));
  },

};