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
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} >
          <div><h3><i className='fa fa-times' onClick={this.closeModal}></i></h3></div>
          <div>
            <p> <span>BUG</span><span>Noraml</span> <span>v0.6.2</span></p>
            <h3>{issue.subject}</h3>
            <p>Assignee: {issue.assignee ? issue.assignee.username : null}</p>
            <p>Creator: {issue.creator ? issue.creator.username : null}</p>
            <h4>Description</h4>
            <p>{issue.description}</p>
            <h4>Images</h4>
            <h4>Files</h4>
            <h4>Comments</h4>
          </div>
        </Modal>
      )
    }else {
      return null;
    }

  }
});