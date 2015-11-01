import { SELECT_GAME } from '../constants/actionTypes.js';


let initialState = {
  currentGame: null
}

export default function games(state = initialState, action){
  switch(action.type){
    case SELECT_GAME:
      console.log('state:', state);
      console.log(action.gameId);
      return Object.assign({}, state, {
          currentGame: action.gameId
        })
    default:
      return state;
  }
}
