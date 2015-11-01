import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './games.scss';

export default class GameSearch extends Component{

  constructor(props){
    super(props);
    this._onChange = this._onChange.bind(this);
    this._showFoundGames = this._showFoundGames.bind(this);
    this._itemOnClick = this._itemOnClick.bind(this);
    this.state = {
      games: {}
    }
  }

  componentDidMount(){
    let queryParams = FlowRouter.getQueryParam('game');
    this.props.actions.setCurrentGame(queryParams);
    $('[name=game-search-field]').val(queryParams)
  }

  render(){

    return (
      <div className={styles.search}>
        <input ref="field" type="text" name="game-search-field" className={styles.field} onChange={this._onChange}/>

        {this._showFoundGames()}
      </div>
    )
  }

  _onChange(e){
    let games = this.props.games;
    let searchString = $(e.currentTarget).val().toLowerCase();
    let foundGames = [];

    if (!searchString){
      this.setState({ games: {} })
    } else {
      _.each(games, game => {
        let title = game.title.toLowerCase();
        if (title.indexOf(searchString) !== -1){
          foundGames.push(game)
          this.setState({games: foundGames})
        }
      })
    }
  }

  _showFoundGames(){
    let games = this.state.games;

    if (games.length > 0){
      return(
        <div className={styles.found}>
          <ul className={styles.list}>
            {games.map(game => {
              return(
                <li data-game-id={game._id} className={styles.item} onClick={this._itemOnClick}>{game.title}</li>
              )
            })}
          </ul>
        </div>
      )
    }
  }

  _itemOnClick(e){
    let field = $(ReactDOM.findDOMNode(this.refs.field));
    let gameId = $(e.currentTarget).data('game-id');
    let gameName = $(e.currentTarget).text();
    field.val(gameName);
    this.setState({ games: {} })
    this.props.actions.setCurrentGame(gameName);
    FlowRouter.setQueryParams({'game':gameName});
  }

}
