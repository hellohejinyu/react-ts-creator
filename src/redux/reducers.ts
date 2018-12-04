import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import history from '../history'
import { meta as homeMeta, reducers as homeReducers } from '../pages/home'

export default combineReducers({
  [homeMeta.id]: homeReducers,
  router: connectRouter(history)
})
