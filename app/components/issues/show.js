var IssueActionCreators = require('../../actions/issue/ActionCreators')
var IssueStore = require('../../stores/IssueStore.js');

IssueDescription = require('./issue_description.js')
IssueSubject = require('./issue_subject.js')
IssueTracker = require('./issue_tracker.js')
IssuePriority = require('./issue_priority.js')
IssueTargetVersion = require('./issue_target_version.js')

module.exports = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false, issue: null }
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  componentWillReceiveProps: function(newProps) {
    if(newProps.issue) {
      this.setState({issue: newProps.issue});
      this.setState({modalIsOpen: true});
    }
  },

  render: function(){
    var issue = this.state.issue;
    if(issue){
      return (
        <Modal className="issue-card__container" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} >
          <div className="issue-card__close-button">
            <i className='fa fa-times' onClick={this.closeModal}></i>
          </div>
          <div>
            <div className="issue-card__section issue-card__pre-header">
              <IssueTracker id={issue.id} />
              <IssuePriority id={issue.id} />
              <IssueTargetVersion id={issue.id} />
            </div>
            <IssueSubject id={issue.id}/>
            <div className="issue-card__section">
              <div>
                <p>
                  Assignee:
                  <span>{issue.assignee ? issue.assignee.username : 'No Assignee'}</span>
                </p>

              </div>
              <p>
                Creator: <span>{issue.creator ? issue.creator.username : null}</span>
              </p>
            </div>
            <IssueDescription id={issue.id} />
            <div className="issue-card__section">
              <h4>Attachments</h4>
            </div>
            <div className="issue-card__section">
              <h4>Comments</h4>
            </div>
          </div>
        </Modal>
      )
    }else {
      return null;
    }

  }
});