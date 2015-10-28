import React from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';

import MainLayout from './components/Layouts/MainLayout.jsx';


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
			<MainLayout content={<Page.LoginPage/>}/>,
			document.getElementById('react-root')
		)
	}
});

FlowRouter.route('/register', {
	action: function(){
		ReactDOM.render(
			<MainLayout content={<Page.RegisterPage/>}/>,
			document.getElementById('react-root')
		)
	}
})

FlowRouter.route('/dashboard', {
	action: function(){
		ReactDOM.render(
			<MainLayout content={<Page.DashboardPage/>}/>,
			document.getElementById('react-root')
		)
	}
})

FlowRouter.initialize();
