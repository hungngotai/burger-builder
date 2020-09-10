import { put, delay } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from '../actions'

export function* logoutSaga(action) {
  yield localStorage.removeItem('idToken')
  yield localStorage.removeItem('localId')
  yield localStorage.removeItem('expirationDate')
  yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000)
  yield put(actions.authLogout())
}

export function* authUserSaga(action) {
  yield put(actions.authStart())
    const payload = {
      email: action.email,
      password: action.password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPZKTVYtAPytmWB46AWOLgePIZ_O6KvC8'
    if (!action.isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPZKTVYtAPytmWB46AWOLgePIZ_O6KvC8'
    }
    try {
      const response = yield axios.post(url, payload)
      const expirationDate = yield new Date(new Date().getTime() + 1000 * response.data.expiresIn)
      yield put(actions.authSuccess(response.data))
      yield put(action.checkAuthTimeout(response.data.expiresIn))
      yield localStorage.setItem('idToken', response.data.idToken)
      yield localStorage.setItem('localId', response.data.localId)
      yield localStorage.setItem('expirationDate', expirationDate)

    } catch (error) {
      yield put(actions.authFail(error.response.data.error))
    }
}
