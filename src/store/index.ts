import {
  createStore,
  Store as VuexStore,
  createLogger,
  CommitOptions,
  DispatchOptions,
} from 'vuex'

import { state, State } from './state'
import { getters, GetterSignatures } from './getters'
import { mutations, MutationSignatures } from './mutations'
import { actions, ActionSignatures } from './actions'

export const store = createStore<State>({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  state,
  getters,
  mutations,
  actions,
})

export function useStore() {
  return store as Store
}

export type Store = Omit<
VuexStore<State>,
'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof MutationSignatures>(
    key: K,
    payload?: Parameters<MutationSignatures[K]>[1],
    options?: CommitOptions
  ): ReturnType<MutationSignatures[K]>
} & {
  dispatch<K extends keyof ActionSignatures>(
    key: K,
    payload?: Parameters<ActionSignatures[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ActionSignatures[K]>
} & {
  getters: {
    [K in keyof GetterSignatures]: ReturnType<GetterSignatures[K]>
  }
}

export * from './actions'
export * from './mutations'
export * from './getters'

export default store
