import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { updatePath } from 'redux-simple-router';
import styles from './games.scss';
import AutocompleteField from '../Form/autocomplete.jsx';
import { Alerts } from '../Alerts/alert.jsx';

import { resetCounts } from '../../animations.js';

const GameSearch = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData(){
    let searchString = Session.get('searchString');
    let gameSub = Meteor.subscribe('games', searchString);

    return{
      gameSub: gameSub,
      games: Games.find().fetch()
    }
  },

  componentDidMount(){
    Session.set('searchString', '');
    this._animateSearchIn();
  },

  render(){

    return (
      <div ref="search" className={styles.search}>
        <label ref="label" className={styles.label}>What Game are You Playing?</label>
        <AutocompleteField ref="search" items={this.data.games} fieldKey="title" name="game-search-field" itemClick={this._itemOnClick}/>

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
      this.props.actions.updatePath('/games/' + gameName);

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
                    <Link to={"/games/" + game} className={styles.link}>{game}</Link>
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
