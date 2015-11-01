import { SET_CURRENT_MODAL, SET_CURRENT_MODAL_REF } from '../constants/actionTypes.js';


let initialState = {
  currentModal: null
}

export default function ui(state = initialState, action){
  switch(action.type){
    case SET_CURRENT_MODAL:
      return Object.assign({}, state, {
          currentModal: action.modalName
        })
    case SET_CURRENT_MODAL_REF:
      return Object.assign({}, state, {
        currentModalRef: action.modalRef
      })
    default:
      return state;
  }
}
