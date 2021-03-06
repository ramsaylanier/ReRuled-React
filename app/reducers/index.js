import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import games from './gamesReducer'
import rules from './rulesReducer'
import ui from './uiReducer'
import users from './usersReducer'

const rootReducer = combineReducers({
  routing: routeReducer,
  games,
  users,
  rules,
  ui
})

export default rootReducer
