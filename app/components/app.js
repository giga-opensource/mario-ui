var Navigation = require('react-router').Navigation;
var SessionStore = require('../stores/SessionStore.js');

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