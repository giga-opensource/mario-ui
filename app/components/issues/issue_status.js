var IssueStore = require('../../stores/IssueStore.js');
var StatusStore = require('../../stores/StatusStore.js');
var ActionCreators = require('../../actions/status/ActionCreators')
var IssueActionCreators = require('../../actions/issue/ActionCreators')

var IssuePopOverItemCreator = React.createClass({

  getInitialState: function(){
    return { editing : false }
  },

  toggleButton: function(){
    this.setState({editing: !this.state.editing})
  },

  componentDidMount: function() {
    StatusStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    StatusStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({editing: false});
  },

  onSave: function(){
    var name = this.refs.name.getDOMNode().value;
    var item = {name: name, project_id: this.props.projectId};
    ActionCreators.new(item);
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
    issue_status = { id: this.props.item.id, payload: { name: name } };
    ActionCreators.update(issue_status);
  },

  onUpdateIssue: function(){
    status_id = this.isActiveItem() ? null : this.props.item.id ;
    issue = { id: this.props.issueId, payload: { status_id: status_id } };
    IssueActionCreators.update(issue)
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({editing: false});
  },

  toggleButton: function(){
    this.setState({editing: !this.state.editing})
  },

  onDelete: function(){
    ActionCreators.delete(this.props.item.id);
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

var ItemList = React.createClass({

  getInitialState: function(){
    return { statuses : [] }
  },

  componentDidMount: function() {
    StatusStore.addChangeListener(this._onChange);
    ActionCreators.fetchAll(this.props.projectId);
  },

  componentWillUnmount: function() {
    StatusStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({statuses: StatusStore.getStatuses()});

    // Hack way to reset issue priority,eg edit name, delete.
    issue = IssueStore.getIssue(this.props.issueId) ;
    issue_status = StatusStore.getStatus(issue.status_id);
    IssueStore.updateIssueAtClient(issue, {status: issue_status});
  },

  render: function(){
    var statuses = this.state.statuses;
    var activeId = this.props.activeId;
    var issueId = this.props.issueId;
    var content = statuses.map(function(status){
      return <IssuePopOverItem item={status} activeId={activeId} issueId={issueId}/>
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
          <span onClick={this.togglePopOver}>{issue.status ?  issue.status.name : 'No Status'}</span>
        )
    } else {
      return (
        <div style={{'display':'inline-block'}}>
          <span>{issue.status ?  issue.status.name : 'No Status'}</span>
          <div className='issue-pop-over'>
            <div className='issue-pop-over__header'>
              <a className='issue-pop-over-header--close-btn issue-pop-over-header--icon' onClick={this.togglePopOver}><i className='fa fa-times'></i></a>
              <span className='issue-pop-over__header--title'>Status</span>
            </div>
            <div className='issue-pop-over__content'>
              <ItemList activeId={issue.status_id} projectId={issue.project_id} issueId={issue.id}/>
              <IssuePopOverItemCreator projectId={issue.project_id} label={'Status'}/>
            </div>
          </div>
        </div>
        )
    }
  },
})