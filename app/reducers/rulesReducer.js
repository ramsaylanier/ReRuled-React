import { ADD_RULE_TO_RULESET, SET_CURRENT_RULE } from '../constants/actionTypes.js';

let initialState = {
  rules: [],
  ruleCount: 0
}

export default function rules(state = initialState, action){
  switch(action.type){
    case ADD_RULE_TO_RULESET:
      return Object.assign({}, state, {
          rules: action.rules
        })
    case SET_CURRENT_RULE:
      return Object.assign({}, state, {
          currentRule: action.rule
        })
    default:
      return state;
  }
}
