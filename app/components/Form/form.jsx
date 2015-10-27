import React from 'react';
import ReactDOM from 'react-dom';
import InputType from "./inputs.jsx";
import styles from "./form.scss";

// Write your package code here!
const Form = React.createClass({

	render(){
		let fields = this.props.attributes.fields;
		let className = this.props.attributes.className ? styles[this.props.attributes.className] : styles.base;
		return(
			<form {...this.props.attributes} className={className} >
				{fields.map( field => {
					return <InputType key={field.id} {...field}/>
				})}
			</form>
		)
	}
});

export default Form;
