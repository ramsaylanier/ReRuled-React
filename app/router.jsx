import React from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';

import Root from './index.jsx';
import App from './containers/app.jsx';

//PAGES
import * as Page from './components/Page/Pages.js';

FlowRouter.route('/', {
	action: function(){
		ReactDOM.render(
			<Root view={<Page.LandingPage/>}/>,
			document.getElementById('react-root')
		)
	}
});

FlowRouter.route('/login', {
	triggersEnter: [function(context, redirect){
		if (Meteor.userId()){
			redirect('/');
		}
	}],
	action: function(){
		ReactDOM.render(
			<Root view={<Page.LoginPage/>}/>,
			document.getElementById('react-root')
		)
	}
});

FlowRouter.route('/profile', {
	triggersEnter: [function(context, redirect){
		if (!Meteor.userId()){
			redirect('/login');
		}
	}],
	action: function(){
		ReactDOM.render(
			<Root view={<Page.ProfilePage/>}/>,
			document.getElementById('react-root')
		)
	}
});

FlowRouter.route('/register', {
	action: function(){
		ReactDOM.render(
			<Root view={<Page.RegisterPage/>}/>,
			document.getElementById('react-root')
		)
	}
})

FlowRouter.route('/dashboard', {
	action: function(){
		ReactDOM.render(
			<Root view=<Page.DashboardPage />/>,
			document.getElementById('react-root')
		)
	}
})

FlowRouter.route('/games/:game', {
	action: function(){
		ReactDOM.render(
			<Root view=<Page.GamePage />/>,
			document.getElementById('react-root')
		)
	}
})

FlowRouter.route('/rules/:rule', {
	action: function(){
		ReactDOM.render(
			<Root view=<Page.RulePage />/>,
			document.getElementById('react-root')
		)
	}
})

FlowRouter.initialize();
