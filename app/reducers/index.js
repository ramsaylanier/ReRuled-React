import { combineReducers } from 'redux'
import games from './gamesReducer'
import rules from './rulesReducer'
import ui from './uiReducer'

const rootReducer = combineReducers({
  games,
  rules,
  ui
})

export default rootReducer
