var ErrorNotice = require('../error_notice.js');
var Link = ReactRouter.Link;

module.exports = React.createClass({

  getInitialState: function(){
    return { errors: [] }
  },

  onCreateIssue: function(){
  },

  render: function(){
    return (
      <div >
        <div>
          <form onSubmit={this.onCreateIssue}>
            <input type="text" ref='name'/>
            <input name="commit" value="Create New Issue" type="submit" />
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Tracker</th>
              <th>Priority</th>
              <th>Target Version</th>
              <th>Subject</th>
              <th>Assignee</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>bug</td>
              <td>High</td>
              <td>v0.6.2</td>
              <td>[Material Library] The number of Thumbnail is not correct</td>
              <td>small fish </td>
              <td>2015/08/16</td>
            </tr>
          </tbody>
        </table>
        <li><Link to="dashboard">Back to Dashboard</Link></li>
      </div>
    )
  }
});