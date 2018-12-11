import 'normalize.css'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'

import Home from './pages/home'

import './styles/index.css'

class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact={true} path='/' component={Home} />
      </Switch>
    )
  }
}

export default hot(module)(App)
