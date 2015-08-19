var IssueActionCreators = require('../../actions/issue/ActionCreators')
var IssueStore = require('../../stores/IssueStore.js');
var IssueClickToTextArea = require('./issue_click_to_textarea.js');

module.exports = React.createClass({
  mixins: [IssueClickToTextArea],

  onSave: function(){
    description = this.refs.description.getDOMNode().value
    issue = { id: this.props.id, payload: { description: description } };
    IssueActionCreators.update(issue)
  },

  render: function(){
    issue = IssueStore.getIssue(this.props.id);
    if (this.state.editing){
      return (
        <div>
          <div className="issue-card__section">
            <h4>Description</h4>
          </div>
          <div className="issue-card__section">
            <textarea ref='description' className='project-issues__issue-textarea'>
              {issue.description}
            </textarea>
            <div><button onClick={this.onSave}>Save</button> <i className='fa fa-times' onClick={this.onCancel}></i></div>
          </div>
        </div>
        )
    } else{
      return (
        <div>
          <div className="issue-card__section">
            <h4>Description <a style={{'text-decoration': 'underline'}} onClick={this.onClick}>Edit</a></h4>
          </div>
          <div className="issue-card__section">
            <div className='project-issues__issue-text' onClick={this.onClick}>{issue.description}</div>
          </div>
        </div>
        )
    }
  },
})