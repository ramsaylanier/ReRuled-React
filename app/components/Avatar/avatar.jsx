import React from 'react';
import ReactDOM from 'react-dom';
import styles from './avatar.scss';

const Avatar = React.createClass({

	componentDidMount(){
		let image = $(ReactDOM.findDOMNode(this));
		image.error(function(e){
			Meteor.call('updateUserAvatar', function(err, res){
				if (err){
					console.log(err)
				} else {
					console.log(res)
				}
			})
		})
	},

	render(){
		let className = styles.base;

		let image = Meteor.user() ? Meteor.user().profile.avatar : '';
		return (
			<img className={className} src={image} />
		)
	}
});

export default Avatar;
