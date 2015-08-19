var IssueActionCreators = require('../../actions/issue/ActionCreators')
var IssueStore = require('../../stores/IssueStore.js');

module.exports = React.createClass({
  getInitialState: function(){
    return { editing : false }
  },

  componentDidMount: function() {
    IssueStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    IssueStore.removeChangeListener(this._onChange);
  },

  onClick: function(){
    this.setState({ editing: true });
  },

  onCancel: function(){
    this.setState({ editing: false });
  },

  onSave: function(){
    subject = this.refs.subject.getDOMNode().value ;
    issue = { id: this.props.id, payload: { subject: subject } };
    IssueActionCreators.update(issue)
  },

  _onChange: function(){
    this.setState({ editing: false });
  },

  render: function(){
    issue = IssueStore.getIssue(this.props.id) ;
    if(this.state.editing) {
      return (
        <div className="issue-card__section">
          <textarea ref='subject' className='project-issues__issue-subject-textarea'>
            {issue.subject}
          </textarea>
          <div><button onClick={this.onSave}>Save</button> <i className='fa fa-times' onClick={this.onCancel}></i></div>
        </div>
        )
    } else {
      return (
        <div className="issue-card__section">
          <h1 className="issue-card__main-header" onClick={this.onClick}>{issue.subject}</h1>
        </div>
        )
    }
  },
})