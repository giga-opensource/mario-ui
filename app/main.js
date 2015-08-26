var React = require('react');
var Router = require('react-router');

var Modal = require('./utils/Modal.js');

var APIRoot = document.location.hostname == "localhost" ? "http://localhost:3000" : "http://mario-api.gigabase.org";

window.React = React;
window.ReactRouter = Router;

window.Modal = Modal;

window.APIRoot = APIRoot;


routes = require('./routes.js');

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});