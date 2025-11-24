import { createStore } from 'vuex'
import auth from './modules/auth'
import tickets from './modules/tickets'

const store = createStore({
  modules: {
    auth,
    tickets,
  },
})

export default store
