var React = require('react');
var Router = require('react-router');

var Modal = require('./utils/Modal.js');

window.React = React;
window.ReactRouter = Router;

window.Modal = Modal;

routes = require('./routes.js');

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});