/** @jsx React.DOM */
var React = require('react');

var SignUp = React.createClass({
  render: function() {
    return (
      <h1>Sign Up!</h1>
    );
  }

});

var SignIn = React.createClass({

  render: function() {
    return (
      <h1>Sign In!</h1>
    );
  }

});

var Login = React.createClass({

  getInitialState: function(){
    return { currentView: 'sign_in' }
  },

  onChangeCurrentView: function(){
    if(this.state.currentView == 'sign_in') {
      currentView = 'sign_up'
    }else{
      currentView = 'sign_in'
    }
    this.setState({currentView: currentView})
  },

  render: function() {
    if(this.state.currentView == 'sign_in'){
      return (
        <div>
          <SignIn/>
          <a onClick={this.onChangeCurrentView} > 还未有账号 </a>
        </div>
      );
    }else {
      return (
        <div>
          <SignUp/>
          <a onClick={this.onChangeCurrentView} > 已有账号 </a>
        </div>
      );
    }
  }
});

module.exports = Login;