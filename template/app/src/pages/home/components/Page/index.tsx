import React, { PureComponent } from 'react'

import connect from 'src/redux/connect'
import actions, { Actions } from '../../actions'
import meta from '../../meta'
import { State } from '../../reducers'

import styles from './index.scss'

class Page extends PureComponent<{ actions: Actions } & State> {
  async componentDidMount () {
    const { actions: { fetch } } = this.props
    await fetch()
  }
  render () {
    const { answer } = this.props
    return (
      <>
        {
          answer ? <div
            className={styles.container}
            style={{ backgroundImage: `url(${answer.image})` }}
          >
            {answer.answer.toUpperCase()}
          </div> :
          <div
            style={{
              color: 'white',
              marginTop: 100,
              textAlign: 'center'
            }}
          >
            loading
          </div>
        }
      </>
    )
  }
}

export default connect(meta.id, actions)(Page)
