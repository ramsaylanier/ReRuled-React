import React from 'react';
import ReactDOM from 'react-dom';
import Label from './label';
import styles from './form.scss';
import autocompleteStyles from './autocomplete.scss'

const AutocompleteField = React.createClass({

	getInitialState(){
		return {value: this.props.value, found: {}}
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
		this.setState({value: e.target.value});

    let items = this.props.items;
    let fieldKey = this.props.fieldKey;
    let searchString = $(e.currentTarget).val().toLowerCase();
    let foundItems = [];

    if (!searchString){
      this.setState({ found: {} })
    } else {
      _.each(items, item => {
        let key = item[fieldKey].toLowerCase();
        if (key.indexOf(searchString) !== -1){
          foundItems.push(item)
          this.setState({found: foundItems})
        }
      })
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

	keyDown(e){
		if (e.keyCode == 13){
			$('.autocomplete__item').first().click();
		}
	},

	render(){
		let hasLabel = this.props.label;
		let value = this.state.value;
		let controlClassName = styles.control;
		let inputClassNames = [styles['text']];
		let onChange = this.props.onChange || this.handleChange;

		_.each(this.props.className, function(className){
			inputClassNames.push('form__' + className);
		});

		return (
			<div className={controlClassName} ref="formControl">
					{this._label()}

					<input ref="input"
							{...this.props}
							className={inputClassNames.join(' ')}
							value={value}
							onKeyDown={this.keyDown}
							onFocus={this.activateField}
							onBlur={this.deactivateField}
							onChange={this.handleChange} />

					{this._overlay()}

					{this._showFoundItems()}
			</div>
		)
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
	},

	_itemClick(e){
		this.setState({
			found: {},
			value: $(e.currentTarget).text()
		})
		this.props.itemClick(e);
	},

	_showFoundItems(){
    let items = this.state.found;
		let onClick = this.props.itemClick;

    if (items.length > 0){
      return(
        <div className={autocompleteStyles.found}>
          <ul className={autocompleteStyles.list}>
            {items.map(item => {
              return(
                <li data-game-id={item._id} className={autocompleteStyles.item} onClick={this._itemClick}>{item.title}</li>
              )
            })}
          </ul>
        </div>
      )
    }
  },
});

export default AutocompleteField;
