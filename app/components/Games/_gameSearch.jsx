import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './games.scss';
import AutocompleteField from '../Form/autocomplete.jsx';

import { resetCounts } from '../../animations.js';

const GameSearch = React.createClass({

  getInitialState(){
    return{
      games: {}
    }
  },

  componentDidMount(){
    this._animateSearchIn();
  },

  render(){

    return (
      <div ref="search" className={styles.search}>
        <label ref="label" className={styles.label}>What Game are You Playing?</label>
        <AutocompleteField ref="search" items={this.props.games} fieldKey="title" name="game-search-field" itemClick={this._itemOnClick}/>
      </div>
    )
  },

  _animateSearchOut(){
    let search = this.refs.search;
    let dY = (window.innerHeight - $(search).outerHeight()) / 4
    TweenMax.to(search, .3, {
      scale: .95,
      y: 80,
      opacity: 0,
      ease: Power4.easeOut
    })
  },

  _animateSearchIn(){
    let search = this.refs.search;
    TweenMax.fromTo(search, .3, {
      scale: .95,
      opacity: 0,
      y: 80
    },{
      scale: 1,
      opacity: 1,
      y: 100,
      ease: Power4.easeOut
    })
  },

  _itemOnClick(e){
    let gameName = $(e.currentTarget).text();
    resetCounts();
    this._animateSearchOut();

    Meteor.setTimeout( () => {
      this.props.actions.setCurrentGame(gameName);
      FlowRouter.setQueryParams({'game':gameName});
      FlowRouter.go('/games/' + gameName);
    }, 300)
  }

});

export default GameSearch;
