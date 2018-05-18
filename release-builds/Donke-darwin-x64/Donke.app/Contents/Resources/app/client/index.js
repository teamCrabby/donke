import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from './app.js'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import store from './store'
import history from './history'

require('electron').ipcRenderer.on('idle-update', (_, idleTime) => store.dispatch({
  type: 'UPDATE_IDLE_TIME',
  idleTime,
}))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>, document.getElementById('app'))