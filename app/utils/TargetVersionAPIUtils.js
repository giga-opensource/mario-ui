var ServerActionCreators = require('../actions/target_version/ServerActionCreators.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');

module.exports = {

  fetchAll: function(projectId) {
    request.get(AppConstants.APIEndpoints.TARGET_VERSIONS_FETCH)
      .query({project_id: projectId})
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            ServerActionCreators.reciveFetchAll(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.reciveFetchAll(json, null);
          }
        }
      });
  },

  targetVersionNew: function(target_version){
    request.post(AppConstants.APIEndpoints.TARGET_VERSION_NEW)
      .send({target_version: target_version})
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            ServerActionCreators.receiveNew(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveNew(json, null);
          }
        }
      });
  },

  targetVersionUpdate: function(target_version){
    var requestUrl = AppConstants.APIEndpoints.TARGET_VERSION_UPDATE + '/' + target_version.id ;
    request.put(requestUrl)
      .send( { target_version: target_version.payload })
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            ServerActionCreators.receiveUpate(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveUpate(json, null);
          }
        }
      });
  },

  targetVersionDelete: function(versionId) {
    var requestUrl = AppConstants.APIEndpoints.TARGET_VERSION_DELETE + '/' + versionId ;
    request.del(requestUrl)
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            ServerActionCreators.receiveDelete(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            ServerActionCreators.receiveDelete(json, null);
          }
        }
      });
  },

  _accessToken: function() {
    return(sessionStorage.getItem('accessToken'));
  },

};