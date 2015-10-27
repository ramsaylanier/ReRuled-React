import React from 'react';

import Header from '../Header/header.jsx';
import {AlertsComponent} from '../Alerts/alert.jsx';
import Triggers from '../../triggers.jsx';
import Modal from '../Modal/modal.jsx';

import './mainLayout.scss';

const MainLayout = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		let currentState = AppState.get() || {modal: null}
		return{
			modal: currentState.modal
		}
	},

	render(){
		var withUser = Meteor.userId();

		return (
			<div className={"application" + (withUser ? ' with-user' : '')}>

				<Header className="app-header">
					<div className="title-container">
						<span className="title"></span>
					</div>
				</Header>

				<AlertsComponent/>

				{this.props.content}

				{this._showModal()}

			</div>
		)
	},

	_showModal(){
		if (this.data.modal){
			return <Modal>{this.data.modal}</Modal>
		}
	}
});

export default MainLayout;
