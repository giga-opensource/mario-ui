var Navigation = require('react-router').Navigation;
var SessionStore = require('../stores/SessionStore.js');

module.exports = React.createClass({
  mixins: [Navigation],

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      this.transitionTo('/s/login');
    }
  },

  render: function () {
    username = SessionStore.getUserName();
    return (
      <div>
        <h2>Welcome back! # {username}.</h2>
      </div>
    );
  }
});