import React, { PureComponent } from 'react'

import { connect } from '../../../../redux'
import actions, { Actions } from '../../actions'
import meta from '../../meta'
import { State } from '../../reducers'
import styles from './index.scss'

class Page extends PureComponent<{ actions: Actions } & State> {
  click () {
    this.props.actions.test()
  }
  render () {
    return (
      <div
        className={styles.title}
        onClick={() => {
          this.click()
        }}
      >
        Home
      </div>
    )
  }
}

export default connect(meta.id, actions)(Page)
