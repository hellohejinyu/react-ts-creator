import React, { PureComponent } from 'react'

import { connect } from 'src/redux'
import actions, { Actions } from '../../actions'
import meta from '../../meta'
import { State } from '../../reducers'
import styles from './index.scss'

class Page extends PureComponent<{ actions: Actions } & State> {
  click () {
    const { actions: { clicked } } = this.props
    clicked()
  }
  render () {
    const { clicked } = this.props
    return (
      <div
        className={styles.title}
        onClick={() => {
          this.click()
        }}
      >
        Hello, {clicked ? 'Typescript' : 'React'}
      </div>
    )
  }
}

export default connect(meta.id, actions)(Page)
