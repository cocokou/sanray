import {post } from 'utils/request'; //Promise
import config from 'config/app.config';

const domain = config.ajax;
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function login(params) {
  return dispatch => {
    type: LOGIN_START,
  }
  return post(domain, 'user_login_with_mobile', params)
    .done(() => {
      dispatch({
        type: LOGIN_SUCCESS
      })
    })
    .fail(() => {
      dispatch({
        type: LOGIN_FAIL
      })
    })
}