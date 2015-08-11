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
      <div>
        <ErrorNotice errors={this.state.errors} />
        <form  onSubmit={this.onSubmit}>
          <input placeholder="Name" type="text" ref='name'/>
          <textarea placeholder="Description" ref='description'/>
          <input value="Create Now" type="submit" />
        </form>
        <li><Link to="dashboard">Back to Dashboard</Link></li>
      </div>
    )
  }
});