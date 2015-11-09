import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './games.scss';
import AutocompleteField from '../Form/autocomplete.jsx';

import { resetCounts } from '../../animations.js';

export default class GameSearch extends Component{

  constructor(props){
    super(props);
    this._itemOnClick = this._itemOnClick.bind(this);
    this.state = {
      games: {}
    }
  }

  componentDidMount(){
    $('[name=game-search-field]').val(this.props.currentGame);
  }

  render(){

    return (
      <div className={styles.search}>
        <AutocompleteField ref="search" label="Enter A Game" items={this.props.games} fieldKey="title" name="game-search-field" itemClick={this._itemOnClick}/>
      </div>
    )
  }

  _itemOnClick(e){
    resetCounts();
    let gameName = $(e.currentTarget).text();
    this.props.actions.setCurrentGame(gameName);
    FlowRouter.setQueryParams({'game':gameName});
  }

}
