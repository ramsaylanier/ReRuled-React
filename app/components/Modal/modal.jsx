import React from 'react';
import Toggle from '../Toggles/toggle.jsx';
import ModalAnimations from './ModalAnimations.js';
import styles from './modal.scss';


const Modal = React.createClass({

	componentDidMount(){
		CurrentModalRef = this.refs.modal;
		ModalAnimations.animateIn();
	},

	render(){

    let className = styles.base;
		let contentClassName = styles.content;

		return (
			<div ref="modal" className={className}>
				<div className={contentClassName}>
					<Toggle type="close" action={ModalAnimations.animateOut}/>
					{this.props.children}
				</div>
			</div>
		)
	}
});

export default Modal;
