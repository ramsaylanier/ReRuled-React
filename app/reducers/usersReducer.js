import { SET_CURRENT_USER } from '../constants/actionTypes.js';

let initialState = {
  currentUser: null
}

export default function users(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_USER:
      console.log('action:', action)
      return Object.assign({}, state, {
          currentUser: action.userId
        })
    default:
      return state;
  }
}
