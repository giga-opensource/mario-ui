var Navigation = require('react-router').Navigation;
var SessionStore = require('../stores/SessionStore.js');

var ProjectList = require('./projects/list.js');

module.exports = React.createClass({
  mixins: [Navigation],

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      this.transitionTo('/s/login');
    }
  },

  render: function () {
    return (
      <ProjectList/>
    );
  }
});