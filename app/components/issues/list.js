var IssueActionCreators = require('../../actions/issue/ActionCreators')
var IssueStore = require('../../stores/IssueStore.js');

module.exports = React.createClass({

  getInitialState: function(){
    return { issues: [] }
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

  render: function(){
    var issuesContent = this.state.issues.map(function(issue){
      var assignee = issue.assignee;
      return (
        <tr>
          <td>#{issue.id}</td>
          <td>bug</td>
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
      <table>
        <thead>
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
        <tbody>
          {issuesContent}
        </tbody>
      </table>
    )
  },
})