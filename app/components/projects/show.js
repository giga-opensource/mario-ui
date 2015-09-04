var ErrorNotice = require('../error_notice.js');
var Link = ReactRouter.Link;

var NewIssue = require('../issues/new.js');
var IssuesList = require('../issues/list.js');
var UserList = require('./users.js');

module.exports = React.createClass({

  render: function(){
    return (
      <div className="project-container">
        <div className="project-issues__container">
          <NewIssue projectId={this.props.params.projectId}/>
          <UserList projectId={this.props.params.projectId} />
          <IssuesList projectId={this.props.params.projectId}/>
          <div className="project__button">
            <Link to="dashboard">Back to Dashboard</Link>
          </div>
        </div>
      </div>
    )
  }
});