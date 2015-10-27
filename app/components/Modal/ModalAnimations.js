import React from 'react';
import ReactDOM from 'react-dom';

import { currentModalRef } from './modal.jsx';

const ModalAnimations = {
	defaults: {
		duration: .1,
		properties: {
			opacity: 1,
			ease: Power2.easeOut
		}
	}
}

ModalAnimations.animateOut = function(){
	let page = $(ReactDOM.findDOMNode(CurrentPageRef));
	let modal = $(ReactDOM.findDOMNode(CurrentModalRef));
	let dX = modal.outerWidth();

	TweenMax.to(page, .4, {
		x: "0%",
		ease: Power2.easeOut
	});

	TweenMax.to(modal, .4, {
		right: -window.innerWidth,
		ease: Power2.easeOut
	});

	Meteor.setTimeout(function(){
		let currentState = AppState.get();
		let updatedState = _.extend(currentState, {modal: null});
		AppState.set(updatedState);
		$('body').removeClass('modal-active');
	}, 500);
}

ModalAnimations.animateIn = function(){
	let page = $(ReactDOM.findDOMNode(CurrentPageRef));
	let modal = $(ReactDOM.findDOMNode(CurrentModalRef));
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
}

export default ModalAnimations;
