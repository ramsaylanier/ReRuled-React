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

const SubNavList = (props) => {
	let navItems = props.navItems;
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

const NavItem = (props) =>{
	let isSubNavItem = props.subNavItem;
	let className = styles.item;
	let linkClassName = styles.link;

	return (
		<li className={className} >
			<Link to={props.url} className={linkClassName} href={props.url}  onClick={props.clickFunction}>
				{props.icon? props.icon : props.name}
			</Link>

			{ props.subnav && <SubNavList {...props.subnav}/> }
		</li>
	)
}

let Navs = [];


export { NavList, SubNavList, NavList, Navs}
