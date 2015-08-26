var IssueActionCreators = require('../../actions/issue/ActionCreators')
var IssueStore = require('../../stores/IssueStore.js');

var Dropzone = require('react-dropzone');

module.exports = React.createClass({

  getInitialState: function(){
    return { attachments : [] }
  },

  componentDidMount: function() {
    IssueStore.addChangeListener(this._onChange);
    IssueActionCreators.fetchFiles(this.props.id);
  },

  componentWillUnmount: function() {
    IssueStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({attachments: IssueStore.getAttachments()});
  },

  onDrop: function(files){
    IssueActionCreators.uploadFiles(this.props.id, files)
  },

  render: function(){
    issue = IssueStore.getIssue(this.props.id);
    attachments = this.state.attachments;
    var content = attachments.map(function(attachment){
      var full_url = APIRoot + attachment.file_url;
      return (
          <img src={full_url}/>
        )
    });
    return (
        <div className="issue-card__section">
          <h4>Attachments</h4>
          <Dropzone onDrop={this.onDrop}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          <div className='issue-card__attachment-list'>
            {content}
          </div>
        </div>
      )
  },
})