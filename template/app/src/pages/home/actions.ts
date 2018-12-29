import api from 'src/api'
import { createActions } from 'src/redux/actions'
import meta from './meta'

export interface Actions {
  fetch: () => Promise<any>
}

const actions: { [K in keyof Actions]: any } = createActions(meta.id, {
  async fetch () {
    const res = await api.yes.no()
    return res
  }
})

export default actions
