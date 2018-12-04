import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import history from './history'
import { store } from './redux'

import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
, document.getElementById('app'))
