var ErrorNotice = require('../error_notice.js');
var Link = ReactRouter.Link;

module.exports = React.createClass({

  getInitialState: function(){
    return { errors: [] }
  },

  onSubmit: function(e){
    e.preventDefault();
    // handle the submit.
  },

  render: function(){
    return (
      <div className="login-container">
        <div className="login-block">
          <div className="login-block__company-logo">
          </div>
          <div className="login-block__content">
            <ErrorNotice errors={this.state.errors} />
            <form className="login-block__form" onSubmit={this.onSubmit}>
              <input className="form__input login-block__input" placeholder="Email" type="email" ref='email'/>
              <input name="commit" value="Send Me Reset Password Instructions" className="form__input button button--primary login-block__button" type="submit" />
            </form>
            <li><Link to="login">Back to Sign in.</Link></li>
          </div>
        </div>
      </div>
    )
  }
});