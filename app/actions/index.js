import * as types from '../constants/actionTypes.js';

export function updatePath(path, noRouterUpdate) {
  console.log(path);
  return {
    type: types.UPDATE_PATH,
    path,
    noRouterUpdate
  }
}

export function addRuleToRuleset(ruleId, rulesetId){
  return{
    type: types.ADD_RULE_TO_RULESET,
    ruleId,
    rulesetId
  }
}

export function setCurrentGame(game){
  return{
    type: types.SET_CURRENT_GAME,
    game
  }
}

export function setCurrentRule(rule){
  return{
    type: types.SET_CURRENT_RULE,
    rule
  }
}

export function setCurrentRuleset(ruleset){
  return{
    type: types.SET_CURRENT_RULESET,
    ruleset
  }
}

export function setCurrentModal(modalName){
  return{
    type: types.SET_CURRENT_MODAL,
    modalName
  }
}

export function setGameContentType(content){
  return{
    type: types.SET_GAME_CONTENT_TYPE,
    content
  }
}
