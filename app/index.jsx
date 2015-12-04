import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, History, Route, IndexRoute, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './containers/app.jsx';
import configureStore from './store/store.js';
import * as Page from './components/Page/Pages.js';
import {syncReduxAndRouter } from 'redux-simple-router';


let store = configureStore();
const history = createBrowserHistory();

syncReduxAndRouter(history, store);

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Page.LandingPage} />
        <Route path="/login" component={Page.LoginPage}/>
        <Route path="/register" component={Page.RegisterPage}/>
        <Route path="/dashboard" component={Page.DashboardPage}/>
        <Route path="/profile" component={Page.ProfilePage}/>
        <Route path="/games/:game" component={Page.GamePage}/>
        <Route path="/rules/:rule" component={Page.RulePage}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('react-root'))
