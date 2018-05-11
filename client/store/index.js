import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import workInterval from './workInterval';
import breakInterval from './breakInterval';
import health from './health';
import idleTime from './idletime';
import status from './status';
import loggedIn from './loggedIn';
import playpenStatus from './playpenStatus'
import avatar from './avatar';

const reducer = combineReducers({ workInterval, breakInterval, health, idleTime, status, loggedIn, playpenStatus, avatar })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './workInterval'
export * from './breakInterval'
export * from './health'
export * from './status'
export * from './idletime'
export * from './loggedIn'
export * from './playpenStatus'
export * from './avatar'

