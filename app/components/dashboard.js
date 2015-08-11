var Navigation = require('react-router').Navigation;
var Link = ReactRouter.Link;
var SessionStore = require('../stores/SessionStore.js');

module.exports = React.createClass({
  mixins: [Navigation],

  componentDidMount: function() {
    if (!SessionStore.isLoggedIn()) {
      this.transitionTo('/s/login');
    }
  },

  render: function () {
    username = SessionStore.getUserName();
    return (
      <div>
        <div className='project--list'>
          <ul>
            <li>
              <Link to='showProject' params={{projectId: 1}}>MATTER</Link>
            </li>
            <li>
              <Link to='showProject' params={{projectId: 2}}>RESET</Link>
            </li>
            <li><Link to='showProject' params={{projectId: 3}}>QCLAER</Link></li>
          </ul>
        </div>
        <div className='project--toolbar'>
          <Link to='createProject'>
            <button className='project--create-btn'> Create new Project</button>
          </Link>
        </div>
      </div>
    );
  }
});