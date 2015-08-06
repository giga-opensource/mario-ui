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