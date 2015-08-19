IssueDescription = require('./issue_description.js')

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
              <span>{issue.tracker ?  issue.tracker.name : 'No Tracker'}</span>
              <span>{issue.priority ?  issue.priority.name : 'No Priority'}</span>
              <span>{issue.target_version ?  issue.target_version.name : 'No Target Version'}</span>
            </div>
            <div className="issue-card__section">
              <h1 className="issue-card__main-header">{issue.subject}</h1>
            </div>
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
              <h4>Images</h4>
            </div>
            <div className="issue-card__section">
              <h4>Files</h4>
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