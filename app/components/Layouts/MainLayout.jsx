import React, { Component } from 'react';

import Header from '../Header/header.jsx';
import {AlertsComponent} from '../Alerts/alert.jsx';
import Triggers from '../../triggers.jsx';
import Modal from '../Modal/modal.jsx';

import './mainLayout.scss';
import { createStore, combineReducers } from 'redux'

var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
});


var store_0 = createStore(reducer)

console.log('store_0 state after initialization:', store_0.getState())

class MainLayout extends Component {

	getMeteorData(){
		let currentState = AppState.get() || {modal: null}
		return{
			modal: currentState.modal
		}
	}

	componentDidMount(){
		this.getMeteorData()
	}

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
	}

	_showModal(){
		console.log(this.data);
		if (this.data.modal){
			return <Modal>{this.data.modal}</Modal>
		}
	}
}

export default MainLayout;
