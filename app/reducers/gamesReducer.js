import { SET_CURRENT_GAME } from '../constants/actionTypes.js';


let initialState = {
  currentGame: null
}

export default function games(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_GAME:
      return Object.assign({}, state, {
          currentGame: action.gameName
        })
    default:
      return state;
  }
}
