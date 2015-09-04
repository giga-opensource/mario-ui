var SessionStore = require('../stores/SessionStore.js');

module.exports = React.createClass({
  render: function () {
    return (
      <div className='user-profile'>
        <div className='user-avatar'>
          <img src='https://trello-avatars.s3.amazonaws.com/c4ee1a36140568846703321cebb03285/170.png' />
        </div>
        <div className='user-info'>
          <h2>{SessionStore.getUserName()}</h2>
          <h3>{SessionStore.getEmail()}</h3>
        </div>
      </div>
     )
  }
});