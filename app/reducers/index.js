import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import games from './gamesReducer'
import rules from './rulesReducer'
import ui from './uiReducer'

const rootReducer = combineReducers({
  routing: routeReducer,
  games,
  rules,
  ui
})

export default rootReducer
