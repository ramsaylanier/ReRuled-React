import React from 'react';
import styles from './button.scss';

const Button = ({type, action, children}) => {
	let className = styles[type] || styles.base;
	return(
		<button className={className} onClick={action}>
			{children}
		</button>
	)
}
export default Button
