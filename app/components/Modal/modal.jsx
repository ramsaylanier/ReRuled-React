import React from 'react';
import ReactDOM from 'react-dom';
import Toggle from '../Toggles/toggle.jsx';
import styles from './modal.scss';


const Modal = React.createClass({

	componentDidMount(){
		this._animateModalIn();
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
		let page = $(ReactDOM.findDOMNode(CurrentPageRef));
		let modal = $(ReactDOM.findDOMNode(this.refs.modal));
		let dX = modal.outerWidth() - ( (window.innerWidth - $('.wrapper__main').outerWidth()) / 2)

		TweenMax.to(page, .4, {
			x: -dX,
			ease: Power2.easeOut
		});

		TweenMax.to(modal, .4, {
			right: 0,
			ease: Power2.easeOut
		});

		$('body').addClass('modal-active');
	},

	_animateModalOut(){
		let page = $(ReactDOM.findDOMNode(CurrentPageRef));
		let modal = $(ReactDOM.findDOMNode(this.refs.modal));
		let dX = modal.outerWidth();


		TweenMax.to(page, .4, {
			x: "0%",
			ease: Power2.easeOut
		});

		TweenMax.to(modal, .4, {
			right: -window.innerWidth,
			ease: Power2.easeOut
		});

		Meteor.setTimeout(() => {
			this.props.actions.setCurrentModal(null);
			$('.modal__base').remove();
			$('body').removeClass('modal-active');
		}, 500);
	}
});

export default Modal;
