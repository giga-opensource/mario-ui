var ServerActionCreators = require('../actions/status/ServerActionCreators.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');

module.exports = {

  fetchAll: function(projectId) {
    request.get(AppConstants.APIEndpoints.STATUS_BASE)
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

  statusNew: function(status){
    request.post(AppConstants.APIEndpoints.STATUS_BASE)
      .send({status: status})
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

  statusUpdate: function(status){
    var requestUrl = AppConstants.APIEndpoints.STATUS_BASE + '/' + status.id ;
    request.put(requestUrl)
      .send( { status: status.payload })
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

  statusDelete: function(statusId) {
    var requestUrl = AppConstants.APIEndpoints.STATUS_BASE + '/' + statusId ;
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