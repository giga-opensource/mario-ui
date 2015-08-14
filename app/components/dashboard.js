var Navigation = require('react-router').Navigation;
var SessionStore = require('../stores/SessionStore.js');

var ProjectList = require('./projects/list.js');

module.exports = React.createClass({
  mixins: [Navigation],

  render: function () {
    if (SessionStore.isLoggedIn()) {
      return (
        <ProjectList/>
      );
    }
    else {
      this.transitionTo('/s/login');
      return null;
    }

  }
});