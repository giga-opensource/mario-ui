var IssueStore = require('../../stores/IssueStore.js');
var IssueActionCreators = require('../../actions/issue/ActionCreators')

var DatePicker = require('react-date-picker');

module.exports = React.createClass({

  getInitialState: function(){
    return { onEditing : false }
  },

  onEditing: function(){
    this.setState({onEditing: true });
  },

  onChange: function(dateString, moment){
    this.refs.dueDate.getDOMNode().value = dateString;
  },

  onSave: function(){
    issue = { id: this.props.id, payload: { due_date: this.refs.dueDate.getDOMNode().value } };
    IssueActionCreators.update(issue)
    this.setState({onEditing: false });
  },

  onCancel: function(){
    this.setState({onEditing: false });
  },

  render: function(){
    issue = IssueStore.getIssue(this.props.id) ;
    var content = ( <span onClick={this.onEditing}> {issue.due_date ? issue.due_date : 'not set yet'} </span>)

    if(this.state.onEditing){
      return (
        <div>
          <input value={issue.due_date} ref='dueDate' />
          <DatePicker
              minDate={Date.now()}
              date={Date.now()}
              onChange={this.onChange}/>

          <div><button onClick={this.onSave}>Save</button> <i className='fa fa-times' onClick={this.onCancel}></i></div>
        </div>
      )
    }else {
      return content
    }
  },
})