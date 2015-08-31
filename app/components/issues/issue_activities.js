var IssueActionCreators = require('../../actions/issue/ActionCreators')
var IssueStore = require('../../stores/IssueStore.js');
var IssueClickToTextArea = require('./issue_click_to_textarea.js');

var TimeAgo = require('react-timeago');
var Gravatar = require('react-gravatar');

var Activity = React.createClass({
  mixins: [IssueClickToTextArea],

  onSave: function(){
    original = this.refs.original.getDOMNode().value
    activity = { id: this.props.activity.id, payload: { original: original } };
    IssueActionCreators.ActivityUpdate(activity)
  },

  onDelete: function(){
    IssueActionCreators.ActivityDelete(this.props.activity.id)
  },

  render: function(){
    activity = this.props.activity;
    if (this.state.editing){
      return (
        <div className='issue-card__activity'>
          <div className='issue-card__activity--creator'>
            <Gravatar email="{activity.creator.email}" />
          </div>
          <div className='issue-card__activity--desc'>
            <div className='issue-card__activity--creator-name'>{ activity.creator.username } </div>
             <textarea ref='original' className='project-issues__issue-comment-textarea'>
              {activity.original}
            </textarea>
            <div><button onClick={this.onSave}>Save</button> <i className='fa fa-times' onClick={this.onCancel}></i></div>
          </div>
        </div>
        )
    } else{
      return (
        <div className='issue-card__activity'>
          <div className='issue-card__activity--creator'>
            <Gravatar email="sjy@gigabase.org" />
          </div>
          <div className='issue-card__activity--desc'>
            <div className='issue-card__activity--creator-name'>{ activity.creator.username } </div>
            { activity.original }
          </div>
          <div className='issue-card__activity--meta'>
            <TimeAgo date={activity.updated_at}/>
            <span onClick={this.onClick}>Edit</span>
            <span onClick={this.onDelete}>Delete</span>
          </div>
        </div>
      )
    }
  },
});


var ActivityNew = React.createClass({

  onSave: function(){
    activity = {
      original: this.refs.original.getDOMNode().value,
      issue_id: this.props.issueId
    };
    this.refs.original.getDOMNode().value = '';
    IssueActionCreators.ActivityNew(activity);
  },

  render: function(){
    activity = this.props.activity;
    return (
      <div className="issue-card__comment">
        <textarea ref='original' className='project-issues__issue-comment-textarea'>
        </textarea>
        <div><button onClick={this.onSave}>Comment</button></div>
      </div>
      )
  },
});

module.exports = React.createClass({

  getInitialState: function(){
    return { activities : [] }
  },

  componentDidMount: function() {
    IssueStore.addChangeListener(this._onChange);
    IssueActionCreators.fetchActivities(this.props.id);
  },

  componentWillUnmount: function() {
    IssueStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({activities: IssueStore.getActivities()});
  },

  render: function(){
    activities = this.state.activities;
    var content = activities.map(function(activity){
      return <Activity activity={activity}/>
    });
    return (
        <div className="issue-card__section">
          <h4>Activity</h4>
          <ActivityNew issueId={this.props.id} />
          <div className='issue-card__attachment-list'>
            {content}
          </div>
        </div>
      )
  },
})