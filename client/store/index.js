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
<<<<<<< HEAD
import playpenStatus from './playpenStatus'


const reducer = combineReducers({ workInterval, breakInterval, health, idleTime, status, loggedIn, playpenStatus })
=======
import avatar from './avatar';


const reducer = combineReducers({ workInterval, breakInterval, health, idleTime, status, loggedIn, avatar })
>>>>>>> 7d019fbf2f38c6878bbe0bd047c345b4cda9d696
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
<<<<<<< HEAD
export * from './playpenStatus'
=======
export * from './avatar'
>>>>>>> 7d019fbf2f38c6878bbe0bd047c345b4cda9d696

