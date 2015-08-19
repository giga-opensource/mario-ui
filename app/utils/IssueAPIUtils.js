var IssueServerActionCreators = require('../actions/issue/ServerActionCreators.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');


module.exports = {

  fetchAll: function(projectId) {
    request.get(AppConstants.APIEndpoints.ISSUES_FETCH)
      .query({project_id: projectId})
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            IssueServerActionCreators.reciveFetchAll(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            IssueServerActionCreators.reciveFetchAll(json, null);
          }
        }
      });
  },

  issueNew: function(issue){
    request.post(AppConstants.APIEndpoints.ISSUE_NEW)
      .send({issue: issue})
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            IssueServerActionCreators.receiveNew(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            IssueServerActionCreators.receiveNew(json, null);
          }
        }
      });
  },

  issueUpdate: function(issue){
    var requestUrl = AppConstants.APIEndpoints.ISSUE_UPDATE + '/' + issue.id ;
    request.put(requestUrl)
      .send( {issue: issue.payload })
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            IssueServerActionCreators.receiveUpate(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            IssueServerActionCreators.receiveUpate(json, null);
          }
        }
      });
  },

  _accessToken: function() {
    return(sessionStorage.getItem('accessToken'));
  },

};