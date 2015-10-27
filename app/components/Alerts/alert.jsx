import React, {Component} from 'react';
import styles from './alerts.scss';

const AlertsComponent = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			alerts: Alerts.collection.find({seen: false}).fetch()
		}
	},

	updateAlert(){

	},

	render(){
		let alerts = this.data.alerts;
    let className = styles.container;

		return (
			<div className={className}>
				{alerts.map(function(alert){
					return (
						<Alert key={alert._id} alert={alert}/>
					)
				})}
			</div>
		)
	}
})

const Alert = React.createClass({

	componentDidMount(){
		var self = this;
		let alertId = this.props.alert._id;
		let alert = React.findDOMNode(this.refs.alert);
		Meteor.setTimeout(function(){
			TweenMax.to(alert, 1, {
				opacity: 0
			});
		}, 2000);

		Meteor.setTimeout(function(){
			self.removeAlert();
		}, 3000);
	},

	removeAlert(){
		Alerts.collection.update(this.props.alert._id, {$set: {seen: true}});
		var alert = React.findDOMNode(this.refs.alert);
		React.unmountComponentAtNode(alert);
	},

	render(){
		console.log(this.props);
		let alert = this.props.alert;
    let className = styles[this.props.alert.type];
		return(
			<div ref="alert" className={className}>
				{alert.message.reason || alert.message}
			</div>
		)
	}
});

const Alerts = {
	collection: new Mongo.Collection(null),
	throw: function(message, type){
		Alerts.collection.insert({message: message, type: type, seen: false});
		// Alerts.render();
	},
	clear: function(){
		Alerts.collection.remove({seen: true});
	}
}


export { AlertsComponent, Alerts, Alert }
