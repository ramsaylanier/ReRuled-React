import { ADD_RULE_TO_RULESET } from '../constants/actionTypes.js';

let initialState = {
  rules: []
}

export default function rules(state = initialState, action){
  switch(action.type){
    case ADD_RULE_TO_RULESET:
      return Object.assign({}, state, {
          rules: action.rules
        })
    default:
      return state;
  }
}
