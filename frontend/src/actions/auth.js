import crypto from 'crypto';
import * as types from '../constants';
import { apiRequest } from './helpers';

const endpoint = '/account/login';

function tryLogin() {
  return { type: types.LOG_IN };
}

function loginSuccess(payload) {
  return { 
    type: types.LOG_IN_SUCCESS,
    payload,
  }
}

function loginError(payload) {
  return {
    type: types.LOG_IN_ERROR,
    payload,
  }
}

export function login(data) {
  return (dispatch) => {
    dispatch(tryLogin());

    return apiRequest('post', data, endpoint)
      .then((response) => {
        console.log(response.data);
        dispatch(loginSuccess(response.data));
      })
      .catch((response) => {
        dispatch(loginError(response.message));
      });
  };
}

export function mockTryLogin(data) {
  return (dispatch) => {
    dispatch(tryLogin());

    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        const {username, password} = data;

        if(!username || !password) {
          return reject('Please enter all required data');
        }

        data._id = crypto.randomBytes(16).toString('hex');
        data.token = "test token"

        return resolve(data);
      }, 2000);
    })
    .then((response) => {
      console.log(response);
      dispatch(loginSuccess(response));
    })
    .catch((error) => {
      console.log(error);
      dispatch(loginError(error));
    });
  };
}