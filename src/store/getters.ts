import { GetterTree } from 'vuex'
import type { State } from './state'

export type GetterSignatures = {
  isAuthorized(state: State): boolean;
}

export const getters: GetterTree<State, State> & GetterSignatures = {
  isAuthorized(state) {
    return !!state.user
  },
}
