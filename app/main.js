/** @jsx React.DOM */
var React, App, Login, Router, NotFound;

React = require('react');
Router = require('react-router');

var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

AppRoot = require('./root.js');
Login = require('./components/login.js');
Dashboard = require('./components/dashboard.js');
NotFound = require('./components/404.js');

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