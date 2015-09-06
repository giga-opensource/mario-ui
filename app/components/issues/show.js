var IssueActionCreators = require('../../actions/issue/ActionCreators')
var IssueStore = require('../../stores/IssueStore.js');

IssueDescription = require('./issue_description.js')
IssueSubject = require('./issue_subject.js')
IssueTracker = require('./issue_tracker.js')
IssuePriority = require('./issue_priority.js')
IssueTargetVersion = require('./issue_target_version.js')
IssueStatus = require('./issue_status.js')
IssueAssignee = require('./issue_assignee')

IssueAttachments = require('./issue_attachments.js')
IssueActivities = require('./issue_activities.js')

module.exports = React.createClass({

  render: function(){
    var issue = this.props.issue;
    if(issue){
      return (
        <Modal className="issue-card__container" isOpen={this.props.modalIsOpen} onRequestClose={this.props.onCloseIsssueDetail} >
          <div className="issue-card__close-button">
            <i className='fa fa-times' onClick={this.props.onCloseIsssueDetail}></i>
          </div>
          <div>
            <div className="issue-card__section issue-card__pre-header">
              <IssueTracker id={issue.id} />
              <IssuePriority id={issue.id} />
              <IssueTargetVersion id={issue.id} />
              <IssueStatus id={issue.id} />
            </div>
            <IssueSubject id={issue.id}/>
            <div className="issue-card__section">
              <div>
                <p>
                  Assignee:
                  <IssueAssignee id={issue.id} />
                </p>
              </div>
              <p>
                Creator: <span>{issue.creator ? issue.creator.username : null}</span>
              </p>
            </div>
            <IssueDescription id={issue.id} />
            <IssueAttachments id={issue.id}/>
            <IssueActivities id={issue.id}/>
          </div>
        </Modal>
      )
    }else {
      return null;
    }
  }
});