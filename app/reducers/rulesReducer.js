import { ADD_RULE_TO_RULESET, INCREASE_RULE_COUNT } from '../constants/actionTypes.js';

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
    default:
      return state;
  }
}
