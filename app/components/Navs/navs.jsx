import React from 'react';
import { Link } from 'react-router';
import styles from './navs.scss';

const NavList = React.createClass({
	render(){
		let navItems = this.props.navItems;
		let navClassName = styles[this.props.navType];
		let className = styles.list;

		return (
			<nav className={navClassName}>
				<ul className={className}>
					{navItems.map( item => {
						return (
							<NavItem key={item.name} {...item}/>
						)
					})}
				</ul>
			</nav>
		)
	}
});

const SubNavList = React.createClass({
	render(){
		let navItems = this.props.navItems;
		let className = styles.subnav__list;

		return (
			<ul className={className}>
				{navItems.map((item) => {
					return (
						<NavItem key={item.name} {...item} subNavItem={true} />
					)
				})}
			</ul>
		)
	}
});

const NavItem = React.createClass({
	render(){
		let isSubNavItem = this.props.subNavItem;
		let className = styles.item;
		let linkClassName = styles.link;

		return (
			<li className={className} >
				<Link to={this.props.url} className={linkClassName} href={this.props.url}  onClick={this.props.clickFunction}>
					{this.props.icon? this.props.icon : this.props.name}
				</Link>

				{ this.props.subnav && <SubNavList {...this.props.subnav}/> }
			</li>
		)
	}
});

let Navs = [];


export { NavList, SubNavList, NavList, Navs}
