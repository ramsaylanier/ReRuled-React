import React from 'react';
import { Link } from 'react-router';
import { LogoIcon } from '../Icons/icons.jsx';
import AppNav from '../Navs/_AppNav.jsx';
import styles from './header.scss';
import wrapperStyles from '../../Stylesheets/wrapper.scss';

const Header = React.createClass({

	componentDidMount(){
		if (Meteor.user()){
			this.props.actions.setCurrentUser(Meteor.user());
		}
	},

	componentDidUpdate(prevProps){
		if (prevProps.title !== this.props.title){
				this._animateTitleIn();
		}
	},

	render(){
		let logoLink = '/';
		let className = styles.base;
		let wrapperClassName = wrapperStyles.flex;

		return (
			<header className={className}>
				<div className={wrapperClassName}>
					<Link to={logoLink} className={styles.brand}>{LogoIcon}</Link>
					<span ref="title" className={styles.title}>{this.props.title}</span>

					<AppNav user={this.props.currentUser} actions={this.props.actions}/>

					{this.props.children}
				</div>
			</header>
		)
	},

	_animateTitleIn(){
		let title = this.refs.title;

		TweenMax.fromTo(title, .6, {
			y: 20,
			opacity: 0
		},{
			y: 0,
			opacity: 1,
			ease: Power4.easeInOut
		})
	}
});

export default Header;
