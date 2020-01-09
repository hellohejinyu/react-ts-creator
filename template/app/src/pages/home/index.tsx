import React from 'react'

import s from './index.scss'

export default () => {
  return (
    <div className={s.container}>
      <img src={require('@/assets/img/react.svg')} />
      <h1 className={s.title}>Hello React.</h1>
    </div>
  )
}
