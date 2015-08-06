var _accessToken = sessionStorage.getItem('accessToken');

module.exports = ({

  isLoggedIn: function() {
    return _accessToken ? true : false;
  },

  getAccessToken: function() {
    return _accessToken;
  }

});