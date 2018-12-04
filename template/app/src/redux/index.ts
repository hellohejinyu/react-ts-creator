import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createActions } from './actions'
import store from './store'

/**
 * 注入 store 和 actions 到组件
 * @param id 组件 meta id
 * @param actions 组件 actions
 */
function connect (id: string, actions: any) {
  return reduxConnect(
    (state: any) => ({ ...state[id] }),
    (dispatch) => ({ dispatch, actions: bindActionCreators(actions, dispatch) })
  )
}

export {
  createActions,
  store,
  connect
}
