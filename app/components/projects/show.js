var ErrorNotice = require('../error_notice.js');
var Link = ReactRouter.Link;

var NewIssue = require('../issues/new.js');
var IssuesList = require('../issues/list.js');

module.exports = React.createClass({

  render: function(){
    return (
      <div >
        <NewIssue projectId={this.props.params.projectId}/>
        <IssuesList projectId={this.props.params.projectId}/>
        <li><Link to="dashboard">Back to Dashboard</Link></li>
      </div>
    )
  }
});