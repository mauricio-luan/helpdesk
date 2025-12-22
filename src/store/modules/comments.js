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
        const comments = await commentsService.getComments(ticketId)

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
