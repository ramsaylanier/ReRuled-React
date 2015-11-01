import React, { Component } from 'react';

export default class GameSelect extends Component{

  constructor(props){
    super(props);
    this._onChange = this._onChange.bind(this);

    console.log(this);
  }

  render(){

    let games = this.props.games;

    return (
      <select onChange={this._onChange}>
        <option>Choose A Game:</option>
        {games.map(game => {
          return(
            <option value={game._id}>{game.title}</option>
          )
        })}
      </select>
    )
  }

  _onChange(e){
    let gameId = $(e.currentTarget).val();
    this.props.actions.selectGame(gameId)
  }

}
