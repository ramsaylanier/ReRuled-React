import React from 'react';
import styles from './button.scss';

const Button = React.createClass({

	render(){
    let className = styles[this.props.type] || styles.base;
		return (
			<button {...this.props} className={className} onClick={this.props.action}>
				{this.props.children}
			</button>
		)
	}
});

export default Button;
