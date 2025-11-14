function createInitialUser() {
  return {
    userId: null,
    idToken: null,
    expiresIn: null,
    isLogged: false,
  }
}

export default {
  namespaced: true,

  state: {
    user: createInitialUser(),
  },

  mutations: {
    login(state, payload) {
      state.user = payload
    },
    logoff(state) {
      state.user = createInitialUser()
    },
  },

  actions: {
    async login(context, payload) {
      context.commit('login', payload)
    },
    logoff(context) {
      context.commit('logoff')
    },
  },

  getters: {},
}
