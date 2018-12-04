import { createAction } from 'redux-actions'

function createActions (prefix: string, actions: any): any {
  const res: object = Object.keys(actions).reduce((results: any, key: any) => {
    results[key] = createAction(`${prefix}_${key}`, actions[key])
    return results
  }, {})

  return res
}

export { createActions }
