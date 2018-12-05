import React, { PureComponent } from 'react'

import { connect } from 'src/redux'
import actions, { Actions } from '../../actions'
import meta from '../../meta'
import { State } from '../../reducers'

import styles from './index.scss'

class Page extends PureComponent<{ actions: Actions } & State> {
  componentDidMount () {
    const { actions: { fetch } } = this.props
    fetch()
  }
  render () {
    const { answer } = this.props
    return (
      <>
        {
          answer && <div
            className={styles.container}
            style={{ backgroundImage: `url(${answer.image})` }}
          >
            {answer.answer.toUpperCase()}
          </div>
        }
      </>
    )
  }
}

export default connect(meta.id, actions)(Page)
