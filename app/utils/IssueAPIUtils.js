var IssueServerActionCreators = require('../actions/issue/ServerActionCreators.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');


module.exports = {

  fetchAll: function(projectId, params) {
    params = params ? params : {} ;
    request.get(AppConstants.APIEndpoints.ISSUE_BASE)
      .query({project_id: projectId})
      .query(params)
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

  fetchIssue: function(issueId) {
    var fetchUrl = AppConstants.APIEndpoints.ISSUE_BASE + '/' + issueId ;
    request.get(fetchUrl)
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            IssueServerActionCreators.reciveFetchIssue(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            IssueServerActionCreators.reciveFetchIssue(json, null);
          }
        }
      });
  },

  issueNew: function(issue){
    request.post(AppConstants.APIEndpoints.ISSUE_BASE)
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
    var requestUrl = AppConstants.APIEndpoints.ISSUE_BASE + '/' + issue.id ;
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

  issueUploadFiles: function(issueId, files) {
    var requestUrl = AppConstants.APIEndpoints.ISSUE_BASE + '/' + issueId + '/upload';
    var req = request.post(requestUrl)
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())

    files.forEach(function(file) {
      req.attach('files[]', file);
    });

    req.end(function(error, res){
      if (res) {
        if (res.error) {
          var errorMsgs = res.body.errors;
          IssueServerActionCreators.receiveUploadFiles(null, errorMsgs);
        } else {
          json = JSON.parse(res.text);
          IssueServerActionCreators.receiveUploadFiles(json, null);
        }
      }
    });

  },

  issueFetchFiles: function(issueId){
    var requestUrl = AppConstants.APIEndpoints.ISSUE_BASE + '/' + issueId + '/attachments';
    request.get(requestUrl)
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            IssueServerActionCreators.reciveFetchFiles(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            IssueServerActionCreators.reciveFetchFiles(json, null);
          }
        }
      });
  },

  issueFetchActivities: function(issueId){
    var requestUrl = AppConstants.APIEndpoints.ACTIVITY_BASE;
    request.get(requestUrl)
      .query({issue_id: issueId})
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            IssueServerActionCreators.reciveFetchActivities(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            IssueServerActionCreators.reciveFetchActivities(json, null);
          }
        }
      });
  },

  ActivityNew: function(activity) {
    request.post(AppConstants.APIEndpoints.ACTIVITY_BASE)
      .send({activity: activity})
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            IssueServerActionCreators.reciveNewActivity(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            IssueServerActionCreators.reciveNewActivity(json, null);
          }
        }
      });
  },

  ActivityUpdate: function(activity) {
    var requestUrl = AppConstants.APIEndpoints.ACTIVITY_BASE + '/' + activity.id;
    request.put(requestUrl)
      .send({activity: activity.payload})
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            IssueServerActionCreators.reciveActivityUpdate(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            IssueServerActionCreators.reciveActivityUpdate(json, null);
          }
        }
      });
  },

  ActivityDelete: function(activityId){
    var requestUrl = AppConstants.APIEndpoints.ACTIVITY_BASE + '/' + activity.id;
    request.del(requestUrl)
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            IssueServerActionCreators.reciveActivityDelete(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            IssueServerActionCreators.reciveActivityDelete(json, null);
          }
        }
      });
  },

  _accessToken: function() {
    return(sessionStorage.getItem('accessToken'));
  },

};