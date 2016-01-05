import React from 'react';

import styles from './gameList.scss';

export default class UserGameList extends React.Component{

  render(){
    let games=this.props.games;

    return(
      <ul>
        {games.map( (game, index) => {
          return(
            <UserGameListItem key={index} game={game} actions={this.props.actions} />
          )
        })}
      </ul>
    )
  }
}

class UserGameListItem extends React.Component{

  render(){
  	return(
      <li ref={ (c) => this.item = c } className={styles.base} onClick={this._handleClick.bind(this)}>
        <span className={styles.link}>{this.props.game}</span>
      </li>
  	)
  }

  _handleClick(e){
    TweenMax.to($('.' + styles.base), .5, {
      opacity: .65,
      scale: 1
    });

    TweenMax.to(this.item, .5, {
      opacity: 1,
      scale: 1.05
    })

    let gameName = $(e.currentTarget).text();
    this.props.actions.setCurrentGame(gameName);
    this.props.actions.updatePath('/dashboard/' + gameName);
  }
}
