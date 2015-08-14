var IssueActionCreators = require('../../actions/issue/ActionCreators')
var IssueStore = require('../../stores/IssueStore.js');

module.exports = React.createClass({

  componentDidMount: function() {
    IssueStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    IssueStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.refs.subject.getDOMNode().value = '';
  },

  onSubmit: function(e){
    e.preventDefault();
    var subject = this.refs.subject.getDOMNode().value;
    var issue = {
      subject: subject,
      project_id: this.props.projectId,
    }
    IssueActionCreators.new(issue);
  },

  render: function(){
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" ref='subject'/>
        <input name="commit" value="Create New Issue" type="submit" />
      </form>
    )
  },
})