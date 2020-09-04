import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  idToken: null,
  idUser: null,
  error: null,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return updateObject(state, {loading: true})
    case actionTypes.AUTH_SUCCESS: return updateObject(state, {loading: false})
    case actionTypes.AUTH_FAIL: return updateObject(state, {loading: false})
    default: return state
  }
}

export default reducer
