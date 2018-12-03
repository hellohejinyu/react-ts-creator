import 'normalize.css'
import React from 'react'
import { hot } from 'react-hot-loader'

import './styles/index.css'

class App extends React.PureComponent {
  render () {
    return <div>Hello World!</div>
  }
}

export default hot(module)(App)
