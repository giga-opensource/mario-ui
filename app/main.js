/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

// react components
var AppRoot = require('./root.js');
var Login = require('./components/login.js');
var Dashboard = require('./components/dashboard.js');
var NotFound = require('./components/404.js');

var routes = (
  <Route name='root' path='/'>
    <Route handler={Login} path='/s/login'/>
    <Route handler={Dashboard} path='/dashboard'/>
    <DefaultRoute handler={AppRoot}/>
    <NotFoundRoute handler={NotFound} />
  </Route>
);


Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});