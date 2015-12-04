import React from 'react';
import { Link } from 'react-router';
import { LogoIcon } from '../Icons/icons.jsx';
import Navs from '../Navs/_navItems.jsx';
import { NavList } from '../Navs/navs.jsx';
import styles from './header.scss';
import wrapperStyles from '../../Stylesheets/wrapper.scss';

const Header = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return{
			user: Meteor.userId()
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
		// let loggedIn = this.data.loggedIn;

		console.log('data:', this.data);

		return (
			<header className={className}>
				<div className={wrapperClassName}>
					<Link to={logoLink} className={styles.brand}>{LogoIcon}</Link>
					<span ref="title" className={styles.title}>{this.props.title}</span>

					{Navs.map( nav => {
						if (nav.location == 'header'){
							return <NavList key={nav.name} withUser={true} navItems={nav.navItems()} navType={nav.name}/>
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
