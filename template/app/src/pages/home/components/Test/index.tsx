import React, { PureComponent } from 'react'

class Test extends PureComponent<{ title: string }> {
  render () {
    const { title } = this.props
    return <h1>{title}</h1>
  }
}

export default Test
