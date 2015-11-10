import React from 'react';
import { LogoIcon } from '../Icons/icons.jsx';
import Navs from '../Navs/_navItems.jsx';
import { NavList } from '../Navs/navs.jsx';
import styles from './header.scss';
import wrapperSrtles from '../../Stylesheets/wrapper.scss';

const Header = React.createClass({
	mixin: [ReactMeteorData],

	getMeteorData(){
		return{
			loggedIn: Meteor.user()
		}
	},

	render(){
		let logoLink = '/';
		let className = styles.base;
		let wrapperClassName = wrapperSrtles.main;

		return (
			<header className={className}>
				<div className={wrapperClassName}>
					<a className="logo" href={logoLink}>{LogoIcon}</a>

					{Navs.map( nav => {
						if (nav.location == 'header'){
							return <NavList key={nav.name} navItems={nav.navItems()} navType={nav.name}/>
						}
					})}

					{this.props.children}
				</div>
			</header>
		)
	}
});

export default Header;
