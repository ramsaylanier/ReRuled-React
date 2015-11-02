import * as types from '../constants/actionTypes.js';

export function setCurrentGame(gameName){
  return{
    type: types.SET_CURRENT_GAME,
    gameName
  }
}

export function addRuleToRuleset(ruleId, rulesetId){
  return{
    type: types.ADD_RULE_TO_RULESET,
    ruleId,
    rulesetId
  }
}

export function setCurrentRule(rule){
  return{
    type: types.SET_CURRENT_RULE,
    rule
  }
}

export function setCurrentModal(modalName){
  return{
    type: types.SET_CURRENT_MODAL,
    modalName
  }
}
