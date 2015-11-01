import React from 'react';
import styles from './toggle.scss';
import { PlusIcon, PlayIcon, StopIcon } from '../Icons/icons.jsx';

const Toggle = React.createClass({
	render: function(){
		let className = styles[this.props.type] || styles.modal;
		return (
			<a className={className} onClick={this._onClick}>
				{this._type()}
			</a>
		)
	},

	_onClick(){
		console.log('click');

		return this.props.action();
	},

	_type(){
		let type = this.props.type;

		if (type === 'menu' || type === 'close'){
			return this._bars();
		} else if ( this.props.type === 'edit' ){
			return this._dots();
		} else if ( this.props.type === 'add' || !this.props.type ){
			return PlusIcon;
		} else if ( this.props.type === 'play'){
			return PlayIcon;
		} else if ( this.props.type === 'stop'){
			return StopIcon;
		}
	},

	_bars(){
		let bar1 = styles.bar1;
		let bar2 = styles.bar2;
		let bar3 = styles.bar3;
		return (
			<div className="bars">
				<div className={bar1}></div>
				<div className={bar2}></div>
				<div className={bar3}></div>
			</div>
		)
	},

	_dots(){
		let className = styles.dots;
		let dotClassName = styles.dot;

		return (
			<div className={className}>
				<span className={dotClassName}></span>
			</div>
		)
	}
});

export default Toggle;
