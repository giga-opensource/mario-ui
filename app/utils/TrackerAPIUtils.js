var TrackerServerActionCreators = require('../actions/tracker/ServerActionCreators.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');

module.exports = {

  fetchAll: function(projectId) {
    request.get(AppConstants.APIEndpoints.TRACKERS_FETCH)
      .query({project_id: projectId})
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            TrackerServerActionCreators.reciveFetchAll(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            TrackerServerActionCreators.reciveFetchAll(json, null);
          }
        }
      });
  },

  trackerNew: function(tracker){
    request.post(AppConstants.APIEndpoints.TRACKER_NEW)
      .send({tracker: tracker})
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            TrackerServerActionCreators.receiveNew(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            TrackerServerActionCreators.receiveNew(json, null);
          }
        }
      });
  },

  trackerUpdate: function(tracker){
    var requestUrl = AppConstants.APIEndpoints.TRACKER_UPDATE + '/' + tracker.id ;
    request.put(requestUrl)
      .send( { tracker: tracker.payload })
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            TrackerServerActionCreators.receiveUpate(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            TrackerServerActionCreators.receiveUpate(json, null);
          }
        }
      });
  },

  trackerDelete: function(trackerId) {
    var requestUrl = AppConstants.APIEndpoints.TRACKER_DELETE + '/' + trackerId ;
    request.del(requestUrl)
      .set('Accept', 'application/json')
      .set('Authorization', this._accessToken())
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            TrackerServerActionCreators.receiveDelete(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            TrackerServerActionCreators.receiveDelete(json, null);
          }
        }
      });
  },

  _accessToken: function() {
    return(sessionStorage.getItem('accessToken'));
  },

};