var IssueStore = require('../../stores/IssueStore.js');
var ProjectStore = require('../../stores/ProjectStore.js');


var IssuePopOverItemCreator = React.createClass({

  getInitialState: function(){
    return { editing : false }
  },

  toggleButton: function(){
    this.setState({editing: !this.state.editing})
  },

  onSave: function(){
    var name = this.refs.name.getDOMNode().value;
  },

  render: function(){
    if(this.state.editing) {
      return(
          <div>
            <input ref='name' placeholder='name'/>
            <button onClick={this.onSave} >Save</button>
            <i className='fa fa-times' onClick={this.toggleButton} />
          </div>
        )
    }else{
      return (
        <a className='issue-pop-over__create-btn' onClick={this.toggleButton}> Create a new {this.props.label}</a>
      )
    }
  },
});

var IssuePopOverItem = React.createClass({
  render: function(){
    var item = this.props.item;
    return (
        <li>
          {item.name}
          <i className='fa fa-pencil'></i>
        </li>
      )
  },
});

module.exports = React.createClass({
  getInitialState: function(){
    return { mode : 'popOverClose' }
  },

  onSave: function(){
    subject = this.refs.subject.getDOMNode().value ;
    issue = { id: this.props.id, payload: { subject: subject } };
    IssueActionCreators.update(issue)
  },

  togglePopOver: function(){
    if(this.state.mode == 'popOverClose'){
      this.setState({mode: 'popOverOpen'});
    }else {
      this.setState({mode: 'popOverClose'});
    }
  },

  render: function(){
    issue = IssueStore.getIssue(this.props.id) ;
    if (this.state.mode == 'popOverClose') {
      return (
          <span onClick={this.togglePopOver}>{issue.tracker ?  issue.tracker.name : 'No Tracker'}</span>
        )
    } else {
      var project = issue.project;
      var content = project.trackers.map(function(tracker){
        <IssuePopOverItem item={tracker} />
      });
      return (
        <div style={{'display':'inline-block'}}>
          <span>{issue.tracker ?  issue.tracker.name : 'No Tracker'}</span>
          <div className='issue-pop-over'>
            <div className='issue-pop-over__header'>
              <a className='issue-pop-over-header--close-btn issue-pop-over-header--icon' onClick={this.togglePopOver}><i className='fa fa-times'></i></a>
              <span className='issue-pop-over__header--title'>Trackers</span>
            </div>
            <div className='issue-pop-over__content'>
              <ul>
                {content}
              </ul>
              <div>
                <IssuePopOverItemCreator projectId={issue.project_id} label={'Tracker'}/>
              </div>
            </div>
          </div>
        </div>
        )
    }
  },
})