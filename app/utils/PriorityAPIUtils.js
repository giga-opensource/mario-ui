var PriorityServerActionCreators = require('../actions/priority/ServerActionCreators.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');

module.exports = {

  fetchAll: function(projectId) {
    request.get(AppConstants.APIEndpoints.PRIORITIES_FETCH)
      .query({project_id: projectId})
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            PriorityServerActionCreators.reciveFetchAll(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            PriorityServerActionCreators.reciveFetchAll(json, null);
          }
        }
      });
  },

  priorityNew: function(priority){
    request.post(AppConstants.APIEndpoints.PRIORITY_NEW)
      .send({priority: priority})
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            PriorityServerActionCreators.receiveNew(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            PriorityServerActionCreators.receiveNew(json, null);
          }
        }
      });
  },

  priorityUpdate: function(priority){
    var requestUrl = AppConstants.APIEndpoints.PRIORITY_UPDATE + '/' + priority.id ;
    request.put(requestUrl)
      .send( { priority: priority.payload })
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            PriorityServerActionCreators.receiveUpate(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            PriorityServerActionCreators.receiveUpate(json, null);
          }
        }
      });
  },

  priorityDelete: function(priorityId) {
    var requestUrl = AppConstants.APIEndpoints.PRIORITY_DELETE + '/' + priorityId ;
    request.del(requestUrl)
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            PriorityServerActionCreators.receiveDelete(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            PriorityServerActionCreators.receiveDelete(json, null);
          }
        }
      });
  },

  _accessToken: function() {
    return(sessionStorage.getItem('accessToken'));
  },

};