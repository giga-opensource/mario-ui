var ProjectStore = require('../../stores/ProjectStore.js');
var ActionCreators = require('../../actions/project/ActionCreators.js')
var Gravatar = require('react-gravatar');

var ProjectUser = React.createClass({
  render: function(){
    user = this.props.user;
    return (
      <div className='project-user'>
        <Gravatar email="{user.email}" />
      </div>
      )
  },
})

module.exports = React.createClass({

  getInitialState: function(){
    return { users: ProjectStore.getUsers() }
  },

  componentDidMount: function() {
    ProjectStore.addChangeListener(this._onChange);
    ActionCreators.fetchUsers(this.props.projectId)
  },

  componentWillUnmount: function() {
    ProjectStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({users: ProjectStore.getUsers()})
  },

  render: function(){
    content = this.state.users.map(function(user){
      return <ProjectUser user={user} /> ;
    });

    return (
      <div className="project-users">
        {content}
      </div>
    )
  },
});