var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

var MarioApp = require('./components/app.js');
var Login = require('./components/login.js');
var Dashboard = require('./components/dashboard.js');
var NotFound = require('./components/404.js');

module.exports = (
  <Route name='root' path='/'>
    <Route handler={Login} path='/s/login'/>
    <Route handler={Dashboard} path='/dashboard'/>
    <DefaultRoute handler={MarioApp}/>
    <NotFoundRoute handler={NotFound} />
  </Route>
);