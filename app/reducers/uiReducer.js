import { SET_CURRENT_MODAL, SET_CURRENT_PAGEREF } from '../constants/actionTypes.js';


let initialState = {
  currentModal: null
}

export default function ui(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_MODAL:
      return Object.assign({}, state, {
        currentModal: action.modalName
      })
    case SET_CURRENT_PAGEREF:
      return Object.assign({}, state, {
        currentPageRef: action.pageRef
      })
    default:
      return state;
  }
}
