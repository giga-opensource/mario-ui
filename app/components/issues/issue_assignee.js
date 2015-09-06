var IssueStore = require('../../stores/IssueStore.js');
var ProjectStore = require('../../stores/ProjectStore.js');

var IssueActionCreators = require('../../actions/issue/ActionCreators')
var ProjectActionCreators = require('../../actions/project/ActionCreators')

var IssuePopOverItem = React.createClass({

  onUpdateIssue: function(){
    assignee_id = this.isActiveItem() ? null : this.props.item.id ;
    issue = { id: this.props.issueId, payload: { assignee_id: assignee_id } };
    IssueActionCreators.update(issue)
  },

  isActiveItem: function(){
    return this.props.activeId  == this.props.item.id
  },

  render: function(){
    var item = this.props.item;
    var activeContent = this.props.activeId == this.props.item.id ? <i className="fa fa-check"/> : null
    return (
        <li>
          <span onClick={this.onUpdateIssue}>{item.username}  { activeContent }</span>
        </li>
      )
  },
});

var ItemList = React.createClass({

  getInitialState: function(){
    return { users : [] }
  },

  componentDidMount: function() {
    ProjectStore.addChangeListener(this._onChange);
    ProjectActionCreators.fetchUsers(this.props.projectId);
  },

  componentWillUnmount: function() {
    ProjectStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({users: ProjectStore.getUsers()});

    // Hack way to reset issue assignee.
    issue = IssueStore.getIssue(this.props.issueId) ;
    user = ProjectStore.getUser(issue.assignee_id);
    IssueStore.updateIssueAtClient(issue, {assignee: user});
  },

  render: function(){
    var users = this.state.users;
    var activeId = this.props.activeId;
    var issueId = this.props.issueId;
    var content = users.map(function(user){
      return <IssuePopOverItem item={user} activeId={activeId} issueId={issueId}/>
    });

    return (
        <ul>
          {content}
        </ul>
      )
  },
});

module.exports = React.createClass({
  getInitialState: function(){
    return { mode : 'popOverClose' }
  },

  togglePopOver: function(){
    if(this.state.mode == 'popOverClose'){
      this.setState({mode: 'popOverOpen'});
    }else {
      this.setState({mode: 'popOverClose'});
    }
  },

  render: function(){
    issue = IssueStore.getIssue(this.props.id) ;
    if (this.state.mode == 'popOverClose') {
      return (
          <span onClick={this.togglePopOver}>{issue.assignee ?  issue.assignee.username : 'No Assignee'}</span>
        )
    } else {
      return (
        <div style={{'display':'inline-block'}}>
          <span onClick={this.togglePopOver}>{issue.assignee ?  issue.assignee.username : 'No Assignee'}</span>
          <div className='issue-pop-over'>
            <div className='issue-pop-over__header'>
              <a className='issue-pop-over-header--close-btn issue-pop-over-header--icon' onClick={this.togglePopOver}><i className='fa fa-times'></i></a>
              <span className='issue-pop-over__header--title'>Change Assignee</span>
            </div>
            <div className='issue-pop-over__content'>
              <ItemList activeId={issue.assignee_id} projectId={issue.project_id} issueId={issue.id}/>
            </div>
          </div>
        </div>
        )
    }
  },
})