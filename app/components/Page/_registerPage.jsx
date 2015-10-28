import React from 'react';

//components
import { Page, PageContent } from '../Page/page.jsx';
import Form from '../Form/form.jsx';

//forms
import { registerForm } from '../Form/Forms.js';

//styles
import wrapperStlyes from '../../Stylesheets/wrapper.scss';

const RegisterPage = React.createClass({

	render(){

    let wrapperClassName = wrapperStlyes.form__white;

		return(
			<Page>
        <PageContent>
  				<div className={wrapperClassName}>
  					<Form attributes={registerForm} />
  				</div>
        </PageContent>
			</Page>
		)
	}
});

export default RegisterPage;
