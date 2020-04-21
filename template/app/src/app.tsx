import 'normalize.css'
import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './styles/index.css'
import s from './home.scss'

const Home = () => (
  <div className={s.container}>
    <img src={require('@/assets/img/react.svg')} />
    <h1 className={s.title}>Hello React.</h1>
  </div>
)

class App extends React.Component {
  render() {
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
