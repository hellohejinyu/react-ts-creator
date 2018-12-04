import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, compose, createStore } from 'redux'

import history from '../history'
import rootReducer from './reducers'

function isPromise (obj: any) {
  return !!obj
  && (typeof obj === 'object' || typeof obj === 'function')
  && typeof obj.then === 'function'
}

const loading = ({ dispatch, getState }: { dispatch: (a: any) => any; getState: any; }) => (next: any) => {
  return (action: any) => {
    if (isPromise(action.payload)) {
      dispatch({
        payload: action.type,
        type: '@@loading/show'
      })
      return action.payload.then((payload: any) => {
        dispatch({ payload, type: action.type })
        dispatch({
          payload: action.type,
          type: '@@loading/hide'
        })
        return { payload, type: action.type }
      }).catch((err: any) => {
        dispatch({ payload: err, type: action.type, error: true })
        dispatch({
          payload: action.type,
          type: '@@loading/hide'
        })
        return Promise.reject(err)
      })
    }
    return next(action)
  }
}

const middlewares = applyMiddleware(routerMiddleware(history), loading)

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middlewares)
    : compose(middlewares)
)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer)
  })
}

export default store
