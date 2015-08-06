var React = require('react');
var Router = require('react-router');

window.React = React;
window.ReactRouter = Router;

routes = require('./routes.js');

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});