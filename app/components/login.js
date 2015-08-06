var ErrorNotice = require('./error_notice.js')
var Navigation = require('react-router').Navigation;
var Link = ReactRouter.Link;

var SessionActionCreators = require('../actions/session/ActionCreators.js');
var SessionStore = require('../stores/SessionStore.js');

var SignUp = React.createClass({
  getInitialState: function(){
    return { errors: [] }
  },
  onSubmit: function(e){
    e.preventDefault();
    var user = {
      username: this.refs.username.getDOMNode().value,
      email: this.refs.email.getDOMNode().value,
      password: this.refs.password.getDOMNode().value,
    };
    this.setState({errors: ["Some Errors"]});
  },
  render: function() {
    return (
      <div>
        <ErrorNotice errors={this.state.errors} />
        <form className="login-block__form" onSubmit={this.onSubmit}>
          <input className="form__input login-block__input" placeholder="User Name" type="text" ref='username'/>
          <input className="form__input login-block__input" placeholder="Email" type="email" ref='email'/>
          <input className="form__input login-block__input" placeholder="Password" type="password" ref='password'/>
          <input name="commit" value="Sign Up" className="form__input button button--primary login-block__button" type="submit" />
        </form>
        <li><a onClick={this.props.onChangeViewMode} > Already have an account? Log in. </a></li>
      </div>
    );
  }
});

var SignIn = React.createClass({
  mixins: [Navigation],

  getInitialState: function(){
    return { errors: [] }
  },

  componentDidMount: function() {
    if (SessionStore.isLoggedIn()) {
      this.transitionTo('/dashboard');
    }

    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    if (SessionStore.isLoggedIn()) {
      this.transitionTo('/dashboard');
    }
    else {
      this.setState({ errors: SessionStore.getErrors() });
    }
  },

  onSubmit: function(e){
    e.preventDefault();
    this.setState({ errors: [] });
    var  email =  this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    SessionActionCreators.login(email, password);
  },

  render: function() {
    return (
      <div>
        <ErrorNotice errors={this.state.errors} />
        <form className="login-block__form" onSubmit={this.onSubmit}>
          <input className="form__input login-block__input" placeholder="Email" type="email" ref='email'/>
          <input className="form__input login-block__input" placeholder="Password" type="password" ref='password'/>
          <input name="commit" value="Sign in" className="form__input button button--primary login-block__button" type="submit" />
        </form>
        <li> <Link to='findPassword'> Forgot password? </Link></li>
        <li> <a onClick={this.props.onChangeViewMode} > No account? Sign up.</a> </li>
      </div>
    );
  }
});

module.exports = React.createClass({
  viewEnum: function(){
    return {
      SING_IN: 0,
      SIGN_UP: 1
    }
  },
  getInitialState: function() {
    return { currentView: this.viewEnum().SING_IN }
  },
  onChangeViewMode: function(){
    currentView = this.state.currentView == this.viewEnum().SING_IN ? this.viewEnum().SING_UP : this.viewEnum().SING_IN
    this.setState({currentView: currentView})
  },
  render: function(){
    var container = this.state.currentView == this.viewEnum().SING_IN ? (
      <SignIn onChangeViewMode={this.onChangeViewMode} />
    ) : (
      <SignUp onChangeViewMode={this.onChangeViewMode}/>
    );
    return (
      <div className="login-container">
        <div className="login-block">
          <div className="login-block__company-logo">
          </div>
          <div className="login-block__content">
            { container }
          </div>
        </div>
      </div>
    )
  }
});