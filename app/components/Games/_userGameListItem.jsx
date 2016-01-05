import React from 'react';

import styles from './games.scss';

export default class UserGameList extends React.Component{

  render(){
    let games=this.props.games;

    console.log(games);

    return(
      <ul>
        {games.map( (game, index) => {
          return(
            <li key={index} ref={ (c) => this.inline_item = c } className={styles.inline_item} onClick={this._setCurrentGame.bind(this, index)}>
              <span className={styles.link}>{game}</span>
            </li>
          )
        })}
      </ul>
    )
  }

  _setCurrentGame(i, e){
		TweenMax.to(this.inline_item, .5, {
			opacity: .5
		});
		let gameName = $(e.currentTarget).text();
		this.props.actions.setCurrentGame(gameName);
	}

}
