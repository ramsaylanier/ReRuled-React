import { Alerts } from '../Alerts/alert.jsx';
import AnimateItem from '../../animations.js';
import PageAnimations from '../Page/PageAnimations.js';


let loginForm = {
	fields: [
		{type: 'text', label: 'username', className: ['field', 'full'], name: 'username'},
		{type: 'password', label:"password", className: ['field', 'full'], name: 'password'},
		{type: 'submit', value: 'Login', className: ['submit']}
	],
	type: 'login',
	animateIn: false,
	onSubmit: function(e){
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
				AnimateItem($('.page'), PageAnimations.animateOut)

				Meteor.setTimeout(function(){
					FlowRouter.go('/dashboard');
				}, 500);
			}
		})
	}
};

export default loginForm;
