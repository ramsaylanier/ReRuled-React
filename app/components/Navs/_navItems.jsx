import React from 'react';
import ReactDOM from 'react-dom';
import { BackIcon, MenuIcon, SearchIcon } from '../Icons/icons.jsx';
import Avatar from '../Avatar/avatar.jsx';

const MobileNav = {
  name: 'mobile',
  location: 'header',
  navItems(){
  	let navItems = [];

  	if (Meteor.user()){
  		navItems = [
  			{
  				url: '',
  				name: 'back',
  				icon: BackIcon,
  				className: 'back-toggle',
  				clickFunction: function(){
  					history.back();
  				}
  			},
  			{
  				url: '/' + Meteor.user().username,
  				name: Meteor.user().username,
  				className: 'home-toggle',
  				icon: <Avatar image={Meteor.user().profile.avatar} />,
  			},
  			{
  				url: '',
  				name: 'nav-toggle',
  				className: 'nav-toggle',
  				icon: MenuIcon,
  				clickFunction: function(){
  					ToggleShelf();
  				}
  			}
  		]
  	} else {
  		navItems = [
  			{url: '/login', name: 'login', className: 'transition-link'}
  		]
  	}

  	return navItems;
  }
}

const ShelfNav = {
  name: 'shelf',
  location: 'shelf',
  navItems(){

  	let navItems = [];

  	if (Meteor.user()){
  		navItems = [
  			{
  				url: '/' + Meteor.user().username,
  				name: 'Dashboard',
  				className: 'transition-link',
  				clickFunction: function(){
  					$('.nav-list').removeClass('active');
  					$('.nav-toggle').removeClass('active');
  				}
  			},
  			{
  				url: '',
  				name: 'New Deck',
  				clickFunction: function(){
  					var modal = document.createElement('div');
  					$(modal).addClass('modal new-form-modal');
  					document.body.appendChild(modal);

  					$('.nav-list').removeClass('active');
  					$('.nav-toggle').removeClass('active');

  					ReactDOM.render(
  						<Modal>
  							<Form attributes={newDeckForm} />
  						</Modal>,
  						modal
  					)
  				}
  			},
  			{
  				url: '/favorites',
  				name: 'Favorites',
  				className: 'transition-link',
  				clickFunction: function(){
  					$('.nav-list').removeClass('active');
  					$('.nav-toggle').removeClass('active');
  				}
  			},
  			{
  				url: '',
  				name: 'logout',
  				clickFunction: function(){
  					Meteor.logout(function(error){
  						if (!error){
  							FlowRouter.go('/');
  						}
  					});
  				}
  			}
  		]
  	} else {
  		navItems = [
  			{url: '/login', name: 'login', className: 'transition-link'}
  		]
  	}

  	return navItems;
  }
}

const PrimaryNav = {
  name: 'primary',
  location: 'header',
  navItems(){
  	var navItems = [];

  	if (Meteor.user()){
  		navItems = [
  			{
  				url: '/search',
  				name: 'search',
  				icon: SearchIcon,
  				className: 'transition-link search-toggle'
  			},
  			{
  				url: '',
  				name: Meteor.user().username,
  				icon: <Avatar image={Meteor.user().profile.avatar} />
  				,
  				mouseEnter: function(e){
  					ReactDOM.render(
  						<Header active={true} />,
  						$('#header').get(0)
  					);
  				},
  				mouseLeave: function(e){
  					ReactDOM.render(
  						<Header active={false} />,
  						$('#header').get(0)
  					);
  				},
  				subnav: {
  					navItems: [
  						{
  							id: 1,
  							url: '/' + Meteor.user().username,
  							name: 'Dashboard',
  							className: 'transition-link'
  						},
  						{
  							id: 3,
  							url: '',
  							name: 'New Deck',
  							clickFunction: function(){
  								var modal = '<div class="modal new-form-modal"></div>';
  								$('body').append(modal);

  								ReactDOM.render(
  									<Modal>
  										<Form attributes={newDeckForm} />
  									</Modal>,
  									modal
  								)
  							}
  						},
  						{
  							id: 4,
  							url: '/favorites',
  							name: 'Favorites',
  							className: 'transition-link'
  						},
  						{
  							id: 5,
  							url: '',
  							name: 'logout',
  							clickFunction: function(){
  								Meteor.logout(function(error){
  									if (!error){
  										FlowRouter.go('/');
  									}
  								});
  							}
  						}
  					]
  				}
  			}
  		]
  	} else {
  		navItems = [

  		]
  	}

  	return navItems;
  }
}

let Navs = [];

Navs.push(PrimaryNav);
Navs.push(ShelfNav);
Navs.push(MobileNav);

export default Navs
