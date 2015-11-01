import React, { Component } from 'react';

import Header from '../Header/header.jsx';
import {AlertsComponent} from '../Alerts/alert.jsx';
import Triggers from '../../triggers.jsx';
import Modal from '../Modal/modal.jsx';
import gamesReducer from '../../reducers/index.js';
import * as Actions from '../../actions/index.js';

import './mainLayout.scss';


class MainLayout extends Component {

	render(){
		var withUser = Meteor.userId();

		// let content = React.cloneElement(this.props.content, {store: store})

		return (
			<div className={"application" + (withUser ? ' with-user' : '')}>

				<Header className="app-header">
					<div className="title-container">
						<span className="title"></span>
					</div>
				</Header>

				<AlertsComponent/>
				{content}

			</div>
		)
	}
}

export default MainLayout;
