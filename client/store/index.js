import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import songs from './songs'
import song from './song'
import suggestions from './suggestions'

const reducer = combineReducers({user, songs, song, suggestions})
const middleware = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
)) : composeWithDevTools(applyMiddleware(
  thunkMiddleware
));

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './songs'
export * from './song'
export * from './suggestions'
