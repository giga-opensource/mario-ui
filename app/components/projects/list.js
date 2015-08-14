var Link = ReactRouter.Link;

var Item = require('./item.js');
var NewProject = require('./new.js');

var ProjectActionCreators = require('../../actions/project/ActionCreators.js');
var ProjectStore = require('../../stores/ProjectStore.js');

module.exports = React.createClass({

  getInitialState: function(){
    return { projects: ProjectStore.getProjects() }
  },

  componentDidMount: function() {
    ProjectStore.addChangeListener(this._onChange);
    console.log(sessionStorage.getItem('accessToken'));
    ProjectActionCreators.fetchAll();
  },

  componentWillUnmount: function() {
    ProjectStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({projects: ProjectStore.getProjects()});
  },

  render: function () {
    var items = this.state.projects.map(function(project){
      return <Item project={project}/>
    });

    return (
      <div className='project-container'>
        <div className='project-list'>
          <ul>
            {items}
          </ul>
        </div>
        <NewProject/>
      </div>
    );
  }
});