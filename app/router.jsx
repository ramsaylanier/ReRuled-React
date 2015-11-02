import React from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';

import Root from './index.jsx';
import App from './containers/app.jsx';

//PAGES
import * as Page from './components/Page/Pages.js';

FlowRouter.route('/', {
	triggersEnter: [function(context, redirect){
		if (!Meteor.user()){
			redirect('/login');
		} else (
			redirect('/dashboard')
		)
	}]
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

FlowRouter.initialize();
