import { put, delay } from 'redux-saga/effects'

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
