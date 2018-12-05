import { handleActions } from 'redux-actions'

import actions from './actions'

export interface State {
  answer: null | { answer: 'yes' | 'no', image: string }
}

const initialState: State = {
  answer: null
}

export default handleActions<any>({
  [actions.fetch] (state, { payload }) {
    return {
      ...state,
      answer: payload
    }
  }
}, initialState)
