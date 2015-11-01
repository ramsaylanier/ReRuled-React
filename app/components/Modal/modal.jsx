import React from 'react';
import ReactDOM from 'react-dom';
import Toggle from '../Toggles/toggle.jsx';
import styles from './modal.scss';

import { animateModalIn, animateModalOut } from './modalAnimations.js';


const Modal = React.createClass({

	componentDidMount(){
		this.props.actions.setCurrentModalRef(this.refs.modal);
		animateModalIn();

		console.log(this.props);
	},

	render(){

    let className = styles.base;
		let contentClassName = styles.content;

		return (
			<div ref="modal" className={className}>
				<div className={contentClassName}>
					<Toggle type="close" action={this._animateModalOut}/>
					{this.props.children}
				</div>
			</div>
		)
	},

	_animateModalIn(){
		animateModalIn();
	},

	_animateModalOut(){
		animateModalOut();
		Meteor.setTimeout( () => {
			this.props.actions.setCurrentModal(null);
		}, 500)
	}
});

export default Modal;
