import { SET_CURRENT_GAME, SET_GAME_CONTENT_TYPE } from '../constants/actionTypes.js';

let initialState = {

}

export default function games(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_GAME:
      console.log('action:', action)
      return Object.assign({}, state, {
          currentGame: action.game
        })
    case SET_GAME_CONTENT_TYPE:
      return Object.assign({}, state, {
          gameContent: action.content
        })
    default:
      return state;
  }
}
