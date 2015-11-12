import { SET_CURRENT_GAME, SET_GAME_CONTENT_TYPE } from '../constants/actionTypes.js';


let initialState = {
  currentGame: null
}

export default function games(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_GAME:
      return Object.assign({}, state, {
          currentGame: action.gameName
        })
    case SET_GAME_CONTENT_TYPE:
      return Object.assign({}, state, {
          gameContent: action.content
        })
    default:
      return state;
  }
}
