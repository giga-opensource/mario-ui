var React = require('react');

var Error = React.createClass({
  render: function() {
    return (
      <li>{ this.props.message }</li>
    )
  }
});

module.exports  = React.createClass({
  render: function () {
    if(this.props.errors.length){
      var errorMessages = this.props.errors.map(function (message){
        return <Error message={message}/>
      });

      return (
        <div> { errorMessages }</div>
      );
    }else{
      return null;
    }
  }
});