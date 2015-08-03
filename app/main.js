/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

routes = require('./routes.js')

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});