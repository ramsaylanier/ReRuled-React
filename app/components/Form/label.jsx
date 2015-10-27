import React, {Component} from 'react';

import styles from "./label.scss"

const Label = React.createClass({
	render: function(){

		let className = styles.floating;

		if (this.props.type == 'checkbox'){
				className = styles.checkbox;
		}

		return (
			<label name={this.props.name + '-label'} className={className}>
				{this.props.label}
			</label>
		)
	}
});

export default Label;
