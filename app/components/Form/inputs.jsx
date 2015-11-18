import React from 'react';
import ReactDOM from 'react-dom';
import Label from './label';
import styles from './form.scss';

const InputType = React.createClass({

	getInitialState(){
		return {value: this.props.value, checked: this.props.checked}
	},

	componentDidMount(){
		let input = $(ReactDOM.findDOMNode(this.refs.input));
		let label = $(ReactDOM.findDOMNode(this.refs.label));

		if (!input.length || !label.length){
			return false;
		} else if (input && input.val().length > 0){
			this.activateField();
		}
	},

	handleChange(e){
		this.activateField(e);
		if (this.props.type == 'checkbox'){
			this.setState({checked: e.target.checked})
		} else {
			this.setState({value: e.target.value});
		}
	},

	activateField(e){
		let input = $(ReactDOM.findDOMNode(this.refs.input));
		let label = $(ReactDOM.findDOMNode(this.refs.label));

		this.setState({isFocused:true});

		TweenMax.to(label, .3, {
			y: -input.outerHeight() + label.outerHeight(),
			ease: Power2.easeOut
		})
	},

	deactivateField(e){
		let input = $(ReactDOM.findDOMNode(this.refs.input));
		let label = $(ReactDOM.findDOMNode(this.refs.label));

		if (input.val().length == 0){
			this.setState({isFocused:false});

			TweenMax.to(label, .3, {
				y: 0,
				ease: Power4.easeOut
			});
		}
	},

	render(){
		let hasLabel = this.props.label;
		let isTextArea = this.props.type === 'textarea';
		let isRange = this.props.type === 'range';
		let value = this.state.value;
		let controlClassName = styles.control;
		let inputClassNames = [styles[this.props.type]];
		let onChange = this.props.onChange || this.handleChange;

		_.each(this.props.className, function(className){
			inputClassNames.push('form__' + className);
		});

		if (this.props.type === 'select'){
			let options = this.props.options;
			return(
				<div className={controlClassName} ref="formControl">
					{this._label()}
					<select ref="input" {...this.props} className={inputClassNames.join(' ')} value={value} onFocus={this.activateField} onBlur={this.deactivateField}>
						{options.map(option =>{
							return(
								<option value={option}>{option}</option>
							)
						})}
					</select>
				</div>
			)
		} else {
			return (
				<div className={controlClassName} ref="formControl">
					{this._label()}

					{isTextArea ?
						<textarea ref="input" {...this.props} className={inputClassNames.join(' ')} value={value} onFocus={this.activateField} onBlur={this.deactivateField} onChange={onChange}>
							{value}
						</textarea> :
						<input ref="input"
							{...this.props}
							className={inputClassNames.join(' ')}
							value={value}
							checked={this.state.checked}
							onFocus={this.activateField}
							onBlur={this.deactivateField}
							onChange={this.handleChange} />
					}

					{isRange &&
						<output>{value || this.props.max / 2}</output>
					}

					{this._overlay()}
				</div>
			)
		}
	},

	_label(){
		if (this.props.label){
			return (
				<Label ref="label" {...this.props} />
			)
		}
	},

	_overlay(){
		let type = this.props.type;

		if (type !== 'submit' && type !== 'checkbox'){
			let overlayClassName = styles.overlay;
			return (
				<span className={overlayClassName}></span>
			)
		}
	}
});

export default InputType;
