var Navigation = require('react-router').Navigation;
var SessionStore = require('../stores/session_store.js');

module.exports = React.createClass({
  mixins: [Navigation],

  componentDidMount: function() {
    if (SessionStore.isLoggedIn()) {
      this.transitionTo('/dashboard');
    } else {
      this.transitionTo('/s/login');
    }
  },

  render: function () {
    return null;
  }
});