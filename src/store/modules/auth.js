import * as authService from '@/api/authService'

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
      try {
        const data = await authService.signin(payload)

        context.commit('login', {
          userId: data.localId,
          idToken: data.idToken,
          expiresIn: data.expiresIn,
          isLogged: true,
        })
      } catch (err) {
        console.error('login: ', err)
        throw err
      }
    },

    logoff(context) {
      context.commit('logoff')
    },
  },

  getters: {
    getUserData(state) {
      return state.user
    },

    isLogged(state) {
      return state.user.isLogged
    },
  },
}
