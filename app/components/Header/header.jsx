import React from 'react';
import { LogoIcon } from '../Icons/icons.jsx';
import Navs from '../Navs/_navItems.jsx';
import { NavList } from '../Navs/navs.jsx';
import styles from './header.scss';
import wrapperStyles from '../../Stylesheets/wrapper.scss';

const Header = React.createClass({
	mixin: [ReactMeteorData],

	getMeteorData(){
		return{
			loggedIn: Meteor.user()
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
					<a className={styles.brand} href={logoLink}>{LogoIcon}</a>
					<span ref="title" className={styles.title}>{this.props.title}</span>

					{Navs.map( nav => {
						if (nav.location == 'header'){
							return <NavList key={nav.name} navItems={nav.navItems()} navType={nav.name}/>
						}
					})}

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
