import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import workInterval from './workInterval';
import breakInterval from './breakInterval';
import idleTime from './idletime';
import status from './status';
import loggedIn from './loggedIn';
import playpenStatus from './playpenStatus'
import avatar from './avatar';
import startTimer from './startTimer'
import user from './user'

const reducer = combineReducers({ workInterval, breakInterval, idleTime, status, loggedIn, playpenStatus, avatar, startTimer, user })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './workInterval'
export * from './breakInterval'
export * from './status'
export * from './idletime'
export * from './loggedIn'
export * from './playpenStatus'
export * from './avatar'
export * from './startTimer'
export * from './user'
