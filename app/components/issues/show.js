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
              <span>BUG</span>
              <span>Normal</span>
              <span>v0.6.2</span>
            </div>
            <div className="issue-card__section">
              <h1 className="issue-card__main-header">{issue.subject}</h1>
            </div>
            <div className="issue-card__section">
              <div>
                <h3>Assignee</h3>
                <p>{issue.assignee ? issue.assignee.username : null}</p>
              </div>
              <div>
                <h3>Creator</h3>
                <p>{issue.creator ? issue.creator.username : null}</p>
              </div>
            </div>
            <div className="issue-card__section">
              <h3>Description</h3>
            </div>
            <div className="issue-card__section">
              <p>{issue.description}</p>
            </div>
            <div className="issue-card__section">
              <h3>Images</h3>
            </div>
            <div className="issue-card__section">
              <h3>Files</h3>
            </div>
            <div className="issue-card__section">
              <h3>Comments</h3>
            </div>
          </div>
        </Modal>
      )
    }else {
      return null;
    }

  }
});