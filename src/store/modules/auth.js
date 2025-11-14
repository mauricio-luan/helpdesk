// const firebaseUrl = import.meta.env.VITE_APP_FIREBASE
const signupUrl = import.meta.env.VITE_APP_SIGNUP

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
    async register(context, payload) {
      try {
        const response = await fetch(signupUrl, {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.senha,
            returnSecureToken: true,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error('HttpError: ', data)
          // data.error.message <- estrutura pra pegar a msg
        }

        console.log('sucesso: ', data)

        /*
        padrão de retorno
        {
          "idToken": "[ID_TOKEN]",
          "email": "[user@example.com]",
          "refreshToken": "[REFRESH_TOKEN]",
          "expiresIn": "3600",
          "localId": "tRcfmLH7..."
        }
        */
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    // const response = await fetch(`${firebaseUrl}/users.json`)

    async login(context, payload) {
      context.commit('login', payload)
    },

    logoff(context) {
      context.commit('logoff')
    },
  },

  getters: {},
}
