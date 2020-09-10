import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import burgerBuilderReducer from './reducers/burgerBuilder'
import orderReducer from './reducers/order'
import authReducer from './reducers/auth'

import { logoutSaga } from './sagas/auth'

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)))

sagaMiddleware.run(logoutSaga)

export default store
