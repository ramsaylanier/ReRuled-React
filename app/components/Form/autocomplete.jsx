import React from 'react';
import ReactDOM from 'react-dom';
import Label from './label';
import styles from './form.scss';
import autocompleteStyles from './autocomplete.scss'

const AutocompleteField = React.createClass({

	getInitialState(){
		return {
			value: this.props.value,
			items: []
		}
	},

	handleChange(e){
		this.setState({value: e.target.value});
    let searchString = $(e.currentTarget).val();
		Meteor.call('search', searchString, this.props.searchCollection, (err, res) => {
			if (res){
				this.setState({items: res})
			}
		});
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
    let items = this.state.items;
		let onClick = this.props.itemClick;

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
