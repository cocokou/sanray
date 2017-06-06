import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import * as Actions from 'actions';

var initial_state = {
  login_ing: false,
  error_msg: '',
  username: '',
  password: '',
}

function login(state = initial_state, action){
  switch(action.type){
    case Actions.LOGIN_START:
      return {...state, login_ing: true};
    case Actions.LOGIN_SUCCESS:
      return {...state, login_ing: false }
    case Actions.LOGIN_FAIL:
      return {...state, action.msg, login_ing: false}
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  routing: routeReducer,
  login
})

export default routeReducer;