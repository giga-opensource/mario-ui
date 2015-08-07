var SessionServerActionCreators = require('../actions/session/ServerActionCreators.js');
var AppConstants = require('../constants/AppConstants.js');
var request = require('superagent');

module.exports = {

  login: function(email, password) {
    request.post(AppConstants.APIEndpoints.LOGIN)
      .send({ email: email, password: password})
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            SessionServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            SessionServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  signup: function(user) {
    request.post(AppConstants.APIEndpoints.SIGNUP)
      .send({user: user})
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = res.body.errors;
            SessionServerActionCreators.receiveLogin(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            SessionServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

};