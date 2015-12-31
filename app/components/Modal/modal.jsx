import React from 'react';
import ReactDOM from 'react-dom';

import { PageOverlay } from '../Page/page.jsx';
import Toggle from '../Toggles/toggle.jsx';
import styles from './modal.scss';

import { animateModalIn, animateModalOut } from './modalAnimations.js';


const Modal = React.createClass({

	componentDidMount(){
		this._animateModalIn();

		$('.page__overlay').on('click', e => {
			this._animateModalOut();
		})
	},

	render(){

    let className = styles.base;
		let contentClassName = styles.content;

		return (
			<div ref={ (c) => this._modal = c } className={className}>
				<div className={contentClassName}>
					<Toggle type="close" action={this._animateModalOut}/>
					{this.props.children}
				</div>
			</div>
		)
	},

	_animateModalIn(){
		let page = $(this.props.currentPageRef);
	  let dX = window.innerWidth / 10;
	  let overlay = $("<div class='page__overlay'></div>")

	  page.append(overlay);

	  TweenMax.to(this._modal, .4, {
	    right: 0,
	    ease: Power2.easeOut
	  });

	  TweenMax.to(overlay, .4, {
	    opacity: 1
	  })
	},

	_animateModalOut(){
		let overlay = $('.page__overlay');
		let dX = $(this._modal).outerWidth();

		TweenMax.to(this._modal, .4, {
			right: -window.innerWidth,
			ease: Power2.easeOut
		});

		TweenMax.to(overlay, .4, {
			opacity: 0
		})

		Meteor.setTimeout( () => {
			overlay.remove();
		}, 400)

		Meteor.setTimeout( () => {
			this.props.actions.setCurrentModal(null);
		}, 500)
	}
});

export default Modal;
