// Load an access token from the session storage, you might want to implement
// a 'remember me' using localSgorage

var _accessToken = sessionStorage.getItem('accessToken')

var SessionStore = ({

  isLoggedIn: function() {
    return _accessToken ? true : false;
  },

  getAccessToken: function() {
    return _accessToken;
  }

});

module.exports = SessionStore;