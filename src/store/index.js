import { createStore } from 'redux'
import burgerBuilderReducer from './reducers/burgerBuilder'

const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
