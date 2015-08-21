var IssueStore = require('../../stores/IssueStore.js');
var TrackerStore = require('../../stores/TrackerStore.js');
var TrackerActionCreators = require('../../actions/tracker/ActionCreators')

var IssuePopOverItemCreator = React.createClass({

  getInitialState: function(){
    return { editing : false }
  },

  toggleButton: function(){
    this.setState({editing: !this.state.editing})
  },

  componentDidMount: function() {
    TrackerStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TrackerStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({editing: false});
  },

  onSave: function(){
    var name = this.refs.name.getDOMNode().value;
    var tracker = {name: name, project_id: this.props.projectId};
    TrackerActionCreators.new(tracker);
  },

  render: function(){
    if(this.state.editing) {
      return (
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
  getInitialState: function(){
    return { editing : false }
  },

  onSave: function(){
    name = this.refs.name.getDOMNode().value ;
    tracker = { id: this.props.item.id, payload: { name: name } };
    TrackerActionCreators.update(tracker)
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({editing: false});
  },

  toggleButton: function(){
    this.setState({editing: !this.state.editing})
  },

  onDelete: function(){
    TrackerActionCreators.delete(this.props.item.id);
  },

  render: function(){
    var item = this.props.item;
    if(this.state.editing) {
      return (
          <div>
            <input ref='name' placeholder='name' defaultValue={item.name}/>
            <button onClick={this.onSave} >Save</button>
            <i className='fa fa-times' onClick={this.toggleButton} />
          </div>
        )
    }else{
      return (
          <li>
            {item.name}
            <i className='fa fa-pencil' onClick={this.toggleButton} />
            <i className='fa fa-trash-o' onClick={this.onDelete} />
          </li>
        )
    }
  },
});

var IssueTrackerList = React.createClass({

  getInitialState: function(){
    return { trackers : [] }
  },

  componentDidMount: function() {
    TrackerStore.addChangeListener(this._onChange);
    TrackerActionCreators.fetchAll(this.props.projectId);
  },

  componentWillUnmount: function() {
    TrackerStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({trackers: TrackerStore.getTrackers() })
  },

  render: function(){
    var trackers = this.state.trackers;
    var content = trackers.map(function(tracker){
      return <IssuePopOverItem item={tracker} />
    });

    return (
        <ul>
          {content}
        </ul>
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
    // Hack way to set issue trackers.
    if (this.state.mode == 'popOverClose') {
      return (
          <span onClick={this.togglePopOver}>{issue.tracker ?  issue.tracker.name : 'No Tracker'}</span>
        )
    } else {
      return (
        <div style={{'display':'inline-block'}}>
          <span>{issue.tracker ?  issue.tracker.name : 'No Tracker'}</span>
          <div className='issue-pop-over'>
            <div className='issue-pop-over__header'>
              <a className='issue-pop-over-header--close-btn issue-pop-over-header--icon' onClick={this.togglePopOver}><i className='fa fa-times'></i></a>
              <span className='issue-pop-over__header--title'>Trackers</span>
            </div>
            <div className='issue-pop-over__content'>
              <IssueTrackerList activeId={issue.tracker_id} projectId={issue.project_id} />
              <IssuePopOverItemCreator projectId={issue.project_id} label={'Tracker'}/>
            </div>
          </div>
        </div>
        )
    }
  },
})