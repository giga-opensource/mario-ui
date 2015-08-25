var IssueActionCreators = require('../../actions/issue/ActionCreators')
var IssueStore = require('../../stores/IssueStore.js');
var IssueDetail = require('../issues/show.js');

var ReactPaginate = require('react-paginate');

module.exports = React.createClass({

  getInitialState: function(){
    return { issues: [], showIssue: null, pageNum: 1, perPage: 20 }
  },

  componentDidMount: function() {
    IssueStore.addChangeListener(this._onChange);
    IssueActionCreators.fetchAll(this.props.projectId, { page: 1, perPage: this.state.perPage } )
  },

  componentWillUnmount: function() {
    IssueStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({issues: IssueStore.getIssues(), pageNum: IssueStore.getMeta().total_pages})
  },

  onShowIssueDetail: function(issue){
    this.setState({showIssue: issue, modalIsOpen: true})
  },

  onCloseIsssueDetail: function(){
    this.setState({modalIsOpen: false})
  },

  handlePageClick: function(data){
    var selected = data.selected;
    IssueActionCreators.fetchAll(this.props.projectId, {page: selected+1, perPage: this.state.perPage})
  },

  render: function(){
    that = this;
    var issuesContent = this.state.issues.map(function(issue){
      var assignee = issue.assignee;
      return (
        <tr className="project-issues__issues-row" onClick={that.onShowIssueDetail.bind(that, issue)}>
          <td>{issue.id}</td>
          <td>{issue.tracker? issue.tracker.name: null}</td>
          <td>{issue.priority? issue.priority.name: null}</td>
          <td>{issue.target_version? issue.target_version.name: null}</td>
          <td>{issue.subject}</td>
          <td>{issue.creator.username}</td>
          <td>{assignee ? assignee.username: ''}</td>
          <td>{issue.due_date}</td>
        </tr>
      );
    });

    return (
      <div className="project-issues__issues-wrapper">
        <table className="project-issues__issues-table">
          <thead className="project-issues__issues-list project-issues__issues-list--header">
            <tr>
              <th>#</th>
              <th>Tracker</th>
              <th>Priority</th>
              <th>Target Version</th>
              <th>Subject</th>
              <th>Creator</th>
              <th>Assignee</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody className="project-issues__issues-list project-issues__issues-list--body">
            {issuesContent}
          </tbody>
        </table>
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClass={"active"} />
        <IssueDetail issue={this.state.showIssue} modalIsOpen={this.state.modalIsOpen} onCloseIsssueDetail={this.onCloseIsssueDetail}/>
      </div>
    )
  },
})