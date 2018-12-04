import { createActions } from '../../redux'
import meta from './meta'

export interface Actions {
  clicked: () => true
}

export default createActions(meta.id, {
  clicked () {
    return true
  }
})
