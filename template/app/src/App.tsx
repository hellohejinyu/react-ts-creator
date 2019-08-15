import 'normalize.css'
import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/home'

import './styles/index.css'

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default hot(module)(App)
