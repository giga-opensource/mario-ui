var Link = ReactRouter.Link;

module.exports = React.createClass({
  render: function () {
    return (
      <li>
        <Link to='showProject' params={{projectId: this.props.project.id}}>{this.props.project.name}</Link>
      </li>
    );
  }
});