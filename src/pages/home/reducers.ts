import { handleActions } from 'redux-actions'

import actions from './actions'

export interface State {
  clicked: boolean
}

const initialState = {
  clicked: false
}

export default handleActions<any>({
  [actions.clicked] (state, { payload }) {
    return {
      ...state,
      clicked: payload
    }
  }
}, initialState)
