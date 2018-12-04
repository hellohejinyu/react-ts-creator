import { handleActions } from 'redux-actions'

import actions from './actions'

export interface State {
  test: boolean
}

const initialState = {
  test: false
}

export default handleActions<any>({
  [actions.test] (state, { payload }) {
    return {
      ...state,
      test: payload
    }
  }
}, initialState)
