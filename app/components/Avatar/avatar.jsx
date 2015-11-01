import React from 'react';
import ReactDOM from 'react-dom';
import styles from './avatar.scss';

const Avatar = React.createClass({

	componentDidMount(){
		let image = $(ReactDOM.findDOMNode(this));
		image.error(function(e){
			Meteor.call('updateUserAvatar', function(err, res){
				if (err){
				} else {
				}
			})
		})
	},
	render(){

		let className = styles.base;
		return (
			<img className={className} src={this.props.image} />
		)
	}
});

export default Avatar;
