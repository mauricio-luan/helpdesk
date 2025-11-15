const firebaseUrl = import.meta.env.VITE_APP_FIREBASE
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
    async signup(context, payload) {
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
          const errorMessage = data.error.message
          throw new Error(errorMessage)
        }

        await context.dispatch('register', {
          idToken: data?.idToken,
          email: data?.email,
          localId: data?.localId,
          name: payload.nome,
        })
      } catch (err) {
        console.error('signup: ', err)
        throw err
      }
    },

    async register(_context, payload) {
      try {
        const localId = payload.localId
        const response = await fetch(`${firebaseUrl}/users/${localId}.json`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
        const data = await response.json()
        if (!response.ok) {
          console.log(data)
          throw new Error(data)
        }
      } catch (error) {
        console.error('register: ', error)
        throw error
      }
    },

    async login(context, payload) {
      context.commit('login', payload)
    },

    logoff(context) {
      context.commit('logoff')
    },
  },

  getters: {},
}
