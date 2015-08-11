var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

var MarioApp = require('./components/app.js');
var Login = require('./components/login.js');

var FindPassword = require('./components/password/find.js');

var ShowProject = require('./components/projects/show.js');
var CreateProject = require('./components/projects/new.js');

var Dashboard = require('./components/dashboard.js');
var NotFound = require('./components/404.js');

module.exports = (
  <Route name='root' path='/'>
    <Route name='login' handler={Login} path='/s/login'/>
    <Route name='dashboard' handler={Dashboard} path='/dashboard'/>
    <Route name="password">
      <Route name="findPassword" path="/password/new" handler={FindPassword} />
    </Route>
    <Route name="project">
      <Route name="createProject" path="/projects/new" handler={CreateProject} />
      <Route name="showProject" path="/projects/:projectId" handler={ShowProject} />
    </Route>
    <DefaultRoute handler={MarioApp}/>
    <NotFoundRoute handler={NotFound} />
  </Route>
);