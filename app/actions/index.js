import * as types from '../constants/actionTypes.js';

export function selectGame(gameId){
  return{
    type: types.SELECT_GAME,
    gameId
  }
}

export function addRuleToRuleset(ruleId, rulesetId){
  return{
    type: types.ADD_RULE_TO_RULESET,
    ruleId,
    rulesetId
  }
}

export function setCurrentModal(modalName){
  return{
    type: types.SET_CURRENT_MODAL,
    modalName
  }
}
