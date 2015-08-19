var IssueStore = require('../../stores/IssueStore.js');
module.exports = {
  getInitialState: function(){
    return { editing : false }
  },

  componentDidMount: function() {
    IssueStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    IssueStore.removeChangeListener(this._onChange);
  },

  onClick: function(){
    this.setState({ editing: true });
  },

  onCancel: function(){
    this.setState({ editing: false });
  },

  _onChange: function(){
    this.setState({ editing: false });
  },
}