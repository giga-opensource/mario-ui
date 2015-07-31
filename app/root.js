var React = require('react');
var Navigation = require('react-router').Navigation;

var Root = React.createClass({
  mixins: [Navigation],

  current_user: function (){
    // Hack way for current_user logic, make sure default page is s/login
    return false
  },
  render: function () {
    if(this.current_user()) {
      this.transitionTo('/dashboard');
    }else {
      this.transitionTo('/s/login');
    }
    return null;
  }
});

module.exports = Root;