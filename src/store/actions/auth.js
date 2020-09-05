import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = ({idToken, localId}) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    localId
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPZKTVYtAPytmWB46AWOLgePIZ_O6KvC8'
    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPZKTVYtAPytmWB46AWOLgePIZ_O6KvC8'
    }
    axios.post(url, payload)
    .then(response => {
      console.log(response.data)
      dispatch(authSuccess(response.data))
      dispatch(checkAuthTimeout(response.data.expiresIn))
    })
    .catch(error => {
      dispatch(authFail(error.response.data.error))
    })
  }
}
