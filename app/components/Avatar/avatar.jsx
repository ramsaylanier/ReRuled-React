import React from 'react';
import ReactDOM from 'react-dom';
import styles from './avatar.scss';

const Avatar = React.createClass({

	componentDidMount(){
		let image = $(ReactDOM.findDOMNode(this));
		console.log(image);
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
		return (
			<img className={className} src={this.props.image} />
		)
	}
});

export default Avatar;
