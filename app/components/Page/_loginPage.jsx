import React from 'react';
import ReactDOM from 'react-dom';

//components
import { Page, PageContent } from '../Page/page.jsx';
import Form from '../Form/form.jsx';
import Button from '../Button/button.jsx';
import { TwitterIcon } from '../Icons/icons.jsx';
import { Alerts } from '../Alerts/alert.jsx';

//forms
import { loginForm } from  '../Form/Forms.js';

//styles
import wrapperStlyes from '../../Stylesheets/wrapper.scss';

const LoginPage = React.createClass({
	render(){

		let wrapperClassName = wrapperStlyes.form__white;

		return (
			<Page backgroundImage={'/img/login-bg.jpg'}>
				<PageContent>
					<div className={wrapperClassName}>
						<Form attributes={loginForm}/>
						<Button type="twitter" action={twitterLogin}>{TwitterIcon} Login With Twitter</Button>
						<p>No account? <a href='/register' className="transition-link">Register</a></p>

						<a className="small render-form" onClick={renderForgotPasswordForm}>Forgot password</a>
					</div>
				</PageContent>
			</Page>
		)
	}
});

let renderForgotPasswordForm = (e)=>{
	e.preventDefault();

	$('.page .wrapper').append('<div id="forgot-password-form-wrapper"></div>');

	ReactDOM.render(
		<div>
			<Form attributes={forgotPasswordForm} />
		</div>,
		document.getElementById('forgot-password-form-wrapper')
	);
};


let twitterLogin = ()=>{
	var loginStyle = 'popup';
	var device = Session.get('device');

	Meteor.loginWithTwitter({loginStyle: loginStyle}, function(error, result){
		if (error){
			Alerts.throw(error, 'error');
		}
		else{
			FlowRouter.go('/' + Meteor.user().username);
		}
	});
};

export default LoginPage;
