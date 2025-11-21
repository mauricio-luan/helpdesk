import * as authService from '@/api/authService'

function createInitialUser() {
  return {
    userId: null,
    email: null,
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
          email: payload.email,
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

    getUserId(state) {
      return state.user.userId
    },

    getUserEmail(state) {
      return state.user.email
    },

    isLogged(state) {
      return state.user.isLogged
    },
  },
}
