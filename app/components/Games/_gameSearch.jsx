import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './games.scss';
import AutocompleteField from '../Form/autocomplete.jsx';
import { Alerts } from '../Alerts/alert.jsx';

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

        {this._showRecentGames()}
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

      if (Meteor.userId()){
        Meteor.call('addGameToRecentGames', gameName, function(err, res){
          if (err){
            Alerts.throw(err.reason, 'error')
          }
        })
      }
    }, 300)
  },

  _showRecentGames(){
    if (Meteor.userId()){
      let recentGames = Meteor.user().recentGames;

      if (recentGames){
        return (
          <div>
            <h5>Recent Games</h5>
            <ul className={styles.list}>
              {recentGames.map( game => {
                return(
                  <li className={styles.item}>
                    <a href={"/games/" + game}>{game}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }
    }
  }

});

export default GameSearch;
