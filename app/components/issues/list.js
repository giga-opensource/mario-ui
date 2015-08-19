var IssueActionCreators = require('../../actions/issue/ActionCreators')
var IssueStore = require('../../stores/IssueStore.js');
var IssueDetail = require('../issues/show.js');

module.exports = React.createClass({

  getInitialState: function(){
    return { issues: [], showIssue: null }
  },

  componentDidMount: function() {
    IssueStore.addChangeListener(this._onChange);
    IssueActionCreators.fetchAll(this.props.projectId)
  },

  componentWillUnmount: function() {
    IssueStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({issues: IssueStore.getIssues()})
  },

  onShowIssueDetail: function(issue){
    this.setState({showIssue: issue})
  },

  render: function(){
    that = this;
    var issuesContent = this.state.issues.map(function(issue){
      var assignee = issue.assignee;
      return (
        <tr className="project-issues__issues-row" onClick={that.onShowIssueDetail.bind(that, issue)}>
          <td>{issue.id}</td>
          <td>BUG</td>
          <td>High</td>
          <td>v0.6.2</td>
          <td>{issue.subject}</td>
          <td>{issue.creator.username}</td>
          <td>{assignee ? assignee.username: ''}</td>
          <td>{issue.due_date}</td>
        </tr>
      );
    });

    return (
      <div className="project-issues__issues-wrapper">
        <table className="project-issues__issues-table">
          <thead className="project-issues__issues-list project-issues__issues-list--header">
            <tr>
              <th>#</th>
              <th>Tracker</th>
              <th>Priority</th>
              <th>Target Version</th>
              <th>Subject</th>
              <th>Creator</th>
              <th>Assignee</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody className="project-issues__issues-list project-issues__issues-list--body">
            {issuesContent}
          </tbody>
        </table>
        <IssueDetail issue={this.state.showIssue}/>
      </div>
    )
  },
})