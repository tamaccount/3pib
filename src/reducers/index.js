import { combineReducers } from "redux";

import ActionTypes from "../actions/ActionTypes";

function Active(state = null, action) {
  switch (action.type) {
    case ActionTypes.START:
    case ActionTypes.ACTIVATE:
      return action.payload.id;
    default:
      return state;
  }
}

export default combineReducers({
  active: Active
});
