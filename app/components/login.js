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

  getInitialState: function() {
    return { currentView: 'sign_in' }
  },

  onChangeCurrentView: function(){
    if (this.state.currentView == 'sign_in') {
      currentView = 'sign_up'
    } else {
      currentView = 'sign_in'
    }
    this.setState({currentView: currentView})
  },

  // -----------------------------
  // HTML SECTION
  render: function() {
    if (this.state.currentView == 'sign_in') {
      return (
        <div className="login-container">    
          <div className="login-block">    
            <div className="login-block__company-logo">
            </div>
            <div className="login-block__content">
              <div className="login-block__header">
                <SignIn/>
                <a onClick={this.onChangeCurrentView} > 还未有账号 </a>
              </div>
              <form className="login-block__form">
                <input className="form__input login-block__input" placeholder="Email" value="stanton@gigabase.org" name="user[email]" id="user_email" type="email" />
                <input autofocus="autofocus" className="form__input login-block__input" placeholder="Password" name="user[password]" id="user_password" type="password" />
                <input name="commit" value="Sign in" className="form__input button button--primary login-block__button" type="submit" />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
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