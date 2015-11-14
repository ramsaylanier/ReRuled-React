import React from 'react';
import ReactDOM from 'react-dom';
import Label from './label';
import styles from './form.scss';
import autocompleteStyles from './autocomplete.scss'

const AutocompleteField = React.createClass({

	getInitialState(){
		return {value: this.props.value, found: {}}
	},

	handleChange(e){
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

	keyDown(e){
		if (e.keyCode == 40){
			this.selectItem('next')
		} else if (e.keyCode == 38){
			this.selectItem('prev')
		} else if (e.keyCode == 13){
			let currentItem = $('.autocomplete__active');
			currentItem.click();
		}
	},

	selectItem(direction){
		console.log(direction);
		let list = $(this.refs.foundList);
		let items = list.children();
		let currentItem = list.children('.autocomplete__active');
		let delta = direction === 'next' ? 1 : -1
		let nextItem = items.get(items.index(currentItem) + delta);


		if (nextItem){
		 currentItem.removeClass('autocomplete__active');
		 $(nextItem).addClass('autocomplete__active');
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
			return (
				<span className={styles.overlay}></span>
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

		console.log(this.props);

    if (items.length > 0){
      return(
        <div ref="foundItems" className={autocompleteStyles.found}>
          <ul ref="foundList" className={autocompleteStyles.list}>
            {items.map( (item, index) => {
              return(
                <li data-game-id={item._id} tabIndex={index + 1} className={autocompleteStyles.item} onClick={this._itemClick}>{item.title}</li>
              )
            })}
          </ul>
        </div>
      )
    }
  },
});

export default AutocompleteField;
