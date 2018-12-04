import { createActions } from '../../redux'
import meta from './meta'

export interface Actions {
  test: () => boolean
}

export default createActions(meta.id, {
  test () {
    return true
  }
})
