import { UPDATE_PATH } from '../constants/actionTypes.js';


function locationToString(location) {
  return location.pathname + location.search + location.hash;
}

const initialState = typeof window === 'undefined' ? {} : {
  path: locationToString(window.location)
};

export function routing(state=initialState, action) {
  if(action.type === UPDATE_PATH) {
    return Object.assign({}, state, {
      path: action.path,
      noRouterUpdate: action.noRouterUpdate
    });
  }
  return state;
}
