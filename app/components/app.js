var React = require('react');
var Navigation = require('react-router').Navigation;

var MarioApp = React.createClass({
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

module.exports = MarioApp;