import React from 'react';
import Form from './form.jsx';
import { Alerts } from '../Alerts/alert.jsx';

let attributes = {
	fields: [
		{type: 'text', label: 'Username', name: 'username', className:['field','full']},
		{type: 'email', label: 'Email', name: 'email', className:['field','full']},
		{type: 'password', label:"password", name: 'password', className:['field','full']},
		{type: 'password', label:"confirm-password", name: 'confirm-password', className:['field','full']},
		{type: 'submit', value: 'Register', className: ['submit','full']}
	],
	type: 'login-form',
	animateIn: false
}

const RegisterForm = React.createClass({

	render(){
		return (
			<Form attributes={attributes} onSubmit={this._onSubmit} />
		)
	},

	_onSubmit(e){
		e.preventDefault();

		var user = {
			username: $(e.target).find('[name="username"]').val(),
			email: $(e.target).find('[name="email"]').val(),
			password: $(e.target).find('[name="password"]').val(),
		}

		var passwordConfirm = $(e.target).find('[name="confirm-password"]').val();

		if (!user.username)
			Alerts.throw("Please enter a username.", 'error');

		else if (!user.email)
			Alerts.throw("Please enter an email address.", 'error');

		else if (!user.password)
			Alerts.throw("Please enter a password.", 'error');

		else if (user.password.length < 6)
			Alerts.throw("Passwords is less that 6 character.", 'error');

		else if (user.password != passwordConfirm){
			Alerts.throw("Passwords do not match.", 'error');
		}

		else (
			Accounts.createUser({email: user.email, password: user.password, username: user.username }, function(error){
				if (error){
					Alerts.throw(error.reason, 'error');
				}
				else {
					Meteor.setTimeout(function(){
						FlowRouter.go('/dashboard');
					}, 500);
				}
			})
		)
	}
})

export default RegisterForm;
