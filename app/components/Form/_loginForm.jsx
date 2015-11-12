import React from 'react';
import Form from './form.jsx';
import { Alerts } from '../Alerts/alert.jsx';

let attributes = {
	fields: [
		{type: 'text', label: 'username', className: ['field', 'full'], name: 'username'},
		{type: 'password', label:"password", className: ['field', 'full'], name: 'password'},
		{type: 'submit', value: 'Login'}
	],
	type: 'login'
}

const LoginForm = React.createClass({

	render(){
		return (
			<Form attributes={attributes} onSubmit={this._onSubmit} />
		)
	},

	_onSubmit(e){
		console.log(e);
		e.preventDefault();

		var userName = $(e.target).find('[name="username"]').val();
		var password = $(e.target).find('[name="password"]').val();

		if (!userName){
			Alerts.throw('Please enter a username', 'error');
			return false;
		}

		if (!password){
			Alerts.throw('Please enter a password', 'error');
			return false;
		}

		Meteor.loginWithPassword(userName, password, function(error, result){
			if (error)
				Alerts.throw(error, 'error')
			else{

				TweenMax.to($('.page__base'), .5, {
					opacity: 0,
					ease: Power2.easeOut
				})

				Meteor.setTimeout(function(){
					FlowRouter.go('/');
				}, 500);
			}
		})
	}
})

export default LoginForm;
