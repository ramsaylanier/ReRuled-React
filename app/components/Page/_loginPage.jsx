import React from 'react';
import { render } from 'react-dom';

//components
import { Link } from 'react-router';
import { Page, PageContent } from '../Page/page.jsx';
import LoginForm from '../Form/_loginForm.jsx';
import Button from '../Button/button.jsx';
import { TwitterIcon } from '../Icons/icons.jsx';
import { Alerts } from '../Alerts/alert.jsx';

//styles
import wrapperStlyes from '../../Stylesheets/wrapper.scss';

const LoginPage = React.createClass({
	render(){

		let wrapperClassName = wrapperStlyes.form__white;

		return (
			<Page>
				<PageContent>
					<div className={wrapperClassName}>
						<LoginForm {...this.props}/>
						<Button type="twitter" action={this._twitterLogin}>{TwitterIcon} Login With Twitter</Button>
						<p>No account? <Link to='/register' className="transition-link">Register</Link></p>

						<Link to="/" className="small render-form" onClick={renderForgotPasswordForm}>Forgot password</Link>
					</div>
				</PageContent>
			</Page>
		)
	},

	_twitterLogin(){
		const loginStyle = 'popup';
		const { updatePath } = this.props.actions;

		Meteor.loginWithTwitter({loginStyle: loginStyle}, function(error, result){
			if (error){
				Alerts.throw(error.message, 'error');
			}
			else{
				updatePath('/dashboard');
			}
		});
	}
});

let renderForgotPasswordForm = (e)=>{
	e.preventDefault();

	$('.page .wrapper').append('<div id="forgot-password-form-wrapper"></div>');

	render(
		<div>
			<Form attributes={forgotPasswordForm} />
		</div>,
		document.getElementById('forgot-password-form-wrapper')
	);
};

export default LoginPage;
