var IssueStore = require('../../stores/IssueStore.js');
var PriorityStore = require('../../stores/PriorityStore.js');
var PriorityActionCreators = require('../../actions/priority/ActionCreators')
var IssueActionCreators = require('../../actions/issue/ActionCreators')

var IssuePopOverItemCreator = React.createClass({

  getInitialState: function(){
    return { editing : false }
  },

  toggleButton: function(){
    this.setState({editing: !this.state.editing})
  },

  componentDidMount: function() {
    PriorityStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PriorityStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({editing: false});
  },

  onSave: function(){
    var name = this.refs.name.getDOMNode().value;
    var priority = {name: name, project_id: this.props.projectId};
    PriorityActionCreators.new(priority);
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
    priority = { id: this.props.item.id, payload: { name: name } };
    PriorityActionCreators.update(priority);
  },

  onUpdateIssue: function(){
    priority_id = this.isActiveItem() ? null : this.props.item.id ;
    issue = { id: this.props.issueId, payload: { priority_id: priority_id } };
    IssueActionCreators.update(issue)
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({editing: false});
  },

  toggleButton: function(){
    this.setState({editing: !this.state.editing})
  },

  onDelete: function(){
    PriorityActionCreators.delete(this.props.item.id);
  },

  isActiveItem: function(){
    return this.props.activeId  == this.props.item.id
  },

  render: function(){
    var item = this.props.item;
    var activeContent = this.props.activeId == this.props.item.id ? <i className="fa fa-check"/> : null
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
            <span onClick={this.onUpdateIssue}>{item.name}  { activeContent }</span>
            <i className='fa fa-pencil' onClick={this.toggleButton} />
            <i className='fa fa-trash-o' onClick={this.onDelete} />
          </li>
        )
    }
  },
});

var IssuePriorityList = React.createClass({

  getInitialState: function(){
    return { priorities : [] }
  },

  componentDidMount: function() {
    PriorityStore.addChangeListener(this._onChange);
    PriorityActionCreators.fetchAll(this.props.projectId);
  },

  componentWillUnmount: function() {
    PriorityStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({priorities: PriorityStore.getPriorities()});

    // Hack way to reset issue tracker,eg edit name, delete.
    issue = IssueStore.getIssue(this.props.issueId) ;
    priority = PriorityStore.getPriority(issue.priority_id);
    IssueStore.updateIssueAtClient(issue, {priority: priority});
  },

  render: function(){
    var priorities = this.state.priorities;
    var activeId = this.props.activeId;
    var issueId = this.props.issueId;
    var content = priorities.map(function(priority){
      return <IssuePopOverItem item={priority} activeId={activeId} issueId={issueId}/>
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
          <span onClick={this.togglePopOver}>{issue.priority ?  issue.priority.name : 'No Priority'}</span>
        )
    } else {
      return (
        <div style={{'display':'inline-block'}}>
          <span>{issue.priority ?  issue.priority.name : 'No Priority'}</span>
          <div className='issue-pop-over'>
            <div className='issue-pop-over__header'>
              <a className='issue-pop-over-header--close-btn issue-pop-over-header--icon' onClick={this.togglePopOver}><i className='fa fa-times'></i></a>
              <span className='issue-pop-over__header--title'>Priorities</span>
            </div>
            <div className='issue-pop-over__content'>
              <IssuePriorityList activeId={issue.priority_id} projectId={issue.project_id} issueId={issue.id}/>
              <IssuePopOverItemCreator projectId={issue.project_id} label={'Priority'}/>
            </div>
          </div>
        </div>
        )
    }
  },
})