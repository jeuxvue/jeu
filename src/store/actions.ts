import { ActionContext, ActionTree } from 'vuex'
import { MutationSignatures, Mutations } from './mutations'
import { State } from './state'

export enum Actions {
  register = 'register',
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof MutationSignatures>(
    key: K,
    payload?: Parameters<MutationSignatures[K]>[1]
  ): ReturnType<MutationSignatures[K]>;
}

export type ActionSignatures = {
  [Actions.register](context: ActionAugments, payload: {username: string, password: string}): void;
}

export const actions: ActionTree<State, State> & ActionSignatures = {
  async [Actions.register]({ commit }, payload) {
    // const user = api.register(payload)
    // commit(Mutations.setUser, user)
  },
}
