import { MutationTree } from 'vuex'
import { State, User } from './state'
import arrayToDictionary from '/@/helpers/arrayToDictionary'

export enum Mutations {
  setUser = 'set_user',
}

export type MutationSignatures = {
  [Mutations.setUser](state: State, user: User | null): void;
}

export const mutations: MutationTree<State> & MutationSignatures = {
  [Mutations.setUser](state, user) {
    state.user = user
  },
}
