import React from 'react';
import { Link } from 'react-router';
import styles from './navs.scss';
import {NavList, NavItem} from './navs.jsx';
import Avatar from '../Avatar/avatar.jsx';

const AppNav = React.createClass({
	render(){

		if (this.props.user || Meteor.loggingIn() ){
			return(
				<NavList type="primary">
					<NavItem>
						<Link to='/' className={styles.link}>
							<Avatar/>
						</Link>
						<NavList type="subnav">
							<NavItem type="link" href="/dashboard">Dashboard</NavItem>
							<NavItem type="link" href="/profile">Profile</NavItem>
							<NavItem type="link" href="/" onClick={this._logout}>Logout</NavItem>
						</NavList>
					</NavItem>
				</NavList>
			)
		} else {
			return(
				<NavList type="primary">
					<NavItem type="link" href="/login">Login</NavItem>
				</NavList>
			)
		}
	},

	_logout(e){
		Meteor.logout( error => {
			this.props.actions.setCurrentUser(null);
    });
	}
})

export default AppNav;
