import * as authService from '@/api/authService'

const firebaseUrl = import.meta.env.VITE_APP_FIREBASE
const signIn = import.meta.env.VITE_APP_SIGNIN

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
    /* solicita cadastro do usuario e salvamento no db */
    async signup(context, payload) {
      try {
        const response = await authService.signup(payload)

        // await context.dispatch('register', {
        //   idToken: response.idToken,
        //   email: response.email,
        //   localId: response.localId,
        // })
      } catch (err) {
        console.error('action signup: ', err)
        throw err
      }
    },

    /* registra o usuario recem-cadastrado no banco de dados*/
    async register(_context, payload) {
      try {
        const localId = payload.localId
        const response = await fetch(`${firebaseUrl}/users/${localId}.json`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data)
        }
      } catch (err) {
        console.error('register: ', err)
        throw err
      }
    },

    async login(context, payload) {
      try {
        const response = await fetch(signIn, {
          method: 'POST',
          body: JSON.stringify({ ...payload, returnSecureToken: true }),
        })

        const data = await response.json()
        if (!response.ok) {
          const errorMessage = data.error.message
          throw new Error(errorMessage)
        }

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
