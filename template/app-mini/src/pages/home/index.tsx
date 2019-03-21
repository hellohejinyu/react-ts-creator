import React, { PureComponent } from 'react'

import api from 'src/api'
import styles from './index.scss'

class Page extends PureComponent {
  state: any = {
    answer: null
  }
  async componentDidMount () {
    const answer = await api.yes.no()
    this.setState({
      answer
    })
  }
  render () {
    const { answer } = this.state
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

export default Page
