var Link = ReactRouter.Link;
module.exports = React.createClass({
  render: function () {
    return (
      <li className="project-list__item">
        <Link className="project-list__item-link" to='showProject' params={{projectId: this.props.project.id}}>
          <h1 className="project-list__item-name">{this.props.project.name}</h1>
        </Link>
      </li>
    );
  }
});