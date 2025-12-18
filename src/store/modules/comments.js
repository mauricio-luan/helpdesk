import * as commentsService from '@/api/commentsService'

export default {
  namespaced: true,

  state: {
    comments: [],
  },

  mutations: {
    setComments(state, payload) {
      state.comments = payload
    },

    resetComments(state) {
      state.comments = []
    },
  },

  actions: {
    async fetchComments(context, ticketId) {
      try {
        const userToken = context.rootGetters['auth/getUserIdToken']
        const comments = await commentsService.getComments(userToken, ticketId)

        context.commit('setComments', comments)
      } catch (error) {
        console.error('fetchComments: ', error)
        throw error
      }
    },
  },
  getters: {
    hasComments(state) {
      return state.comments.length > 0
    },

    getAllComments(state) {
      return state.comments
    },
  },
}
