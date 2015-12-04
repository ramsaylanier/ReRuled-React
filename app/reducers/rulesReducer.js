import { SET_CURRENT_RULE, SET_CURRENT_RULESET } from '../constants/actionTypes.js';

let initialState = {

}

export default function rules(state = initialState, action){

  switch(action.type){
    case SET_CURRENT_RULESET:
      return Object.assign({}, state, {
        currentRuleset: action.ruleset
      })
    case SET_CURRENT_RULE:
      return Object.assign({}, state, {
          currentRule: action.rule
        })
    default:
      return state;
  }
}
