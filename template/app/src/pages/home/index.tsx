import React from 'react'

import s from './index.scss'

export default () => (
  <div className={s.container}>
    <img
      src={require('src/assets/img/react.svg')}
    />
    <h1 className={s.title}>Hello React.</h1>
  </div>
)
