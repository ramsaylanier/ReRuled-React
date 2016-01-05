import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, History, Route, IndexRoute, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './containers/app.jsx';
import store from './store/store.js';
import * as Page from './components/Page/Pages.js';
import {syncReduxAndRouter } from 'redux-simple-router';

const history = createBrowserHistory();

syncReduxAndRouter(history, store);

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Page.LandingPage} />
        <Route path="/login" component={Page.LoginPage} />
        <Route path="/register" component={Page.RegisterPage} />
        <Route path="/dashboard" component={Page.DashboardPage}/>
        <Route path="/dashboard/:game" component={Page.DashboardPage}/>
        <Route path="/profile" component={Page.ProfilePage}/>
        <Route path="/games/:game" component={Page.GamePage}/>
        <Route path="/rules/:rule" component={Page.RulePage}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('react-root'))


Meteor.startup(() => {
	Accounts.onLogin(function(){
		var user = Meteor.user();
		//Set the currentUser in redux store
		store.dispatch({type: 'SET_CURRENT_USER', userId: user._id});

		//if user doesn't have avatar, user the default avatar
		if (!user.profile.avatar){
			Meteor.users.update(user._id, {$set: {'profile.avatar': '/img/default-avatar.png'}});
		}
	})

  Meteor.call('serviceConfig', 'popup', function(error){
		if (error)
			Errors.throw(error.reason, 'error')
	});
});
