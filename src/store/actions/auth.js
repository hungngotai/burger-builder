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
  localStorage.removeItem('idToken')
  localStorage.removeItem('localId')
  localStorage.removeItem('expirationDate')
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
      const expirationDate = new Date(new Date().getTime() + 1000 * response.data.expiresIn)
      dispatch(authSuccess(response.data))
      dispatch(checkAuthTimeout(response.data.expiresIn))
      localStorage.setItem('idToken', response.data.idToken)
      localStorage.setItem('localId', response.data.localId)
      localStorage.setItem('expirationDate', expirationDate)
    })
    .catch(error => {
      dispatch(authFail(error.response.data.error))
    })
  }
}

export const setRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const checkAuthState = () => {
  return dispatch => {
    const idToken = localStorage.getItem('idToken')
    const localId = localStorage.getItem('localId')
    if (!idToken) {
      dispatch(authLogout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate > new Date()) {
        dispatch(authSuccess(idToken, localId))
        dispatch(checkAuthTimeout(expirationDate.getSeconds() - new Date().getSeconds()))
      } else {
        dispatch(authLogout())
      }
    }
  }
}
