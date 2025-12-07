import { createStore } from 'vuex'
import auth from './modules/auth'
import tickets from './modules/tickets'
import comments from './modules/comments'

const store = createStore({
  modules: {
    auth,
    tickets,
    comments,
  },
})

export default store
