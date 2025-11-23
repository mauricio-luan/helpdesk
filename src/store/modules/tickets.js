import * as ticketService from '@/api/ticketService'

export default {
  namespaced: true,

  state: {
    tickets: [],
  },

  mutations: {
    setTickets(state, payload) {
      state.tickets = payload
    },
  },

  actions: {
    async fetchTickets(context) {
      try {
        const userToken = context.rootGetters['auth/getUserIdToken']
        const tickets = await ticketService.getTickets(userToken)

        context.commit('setTickets', tickets)
      } catch (error) {
        console.error('fetchTickets: ', error)
        throw error
      }
    },
  },

  getters: {
    isTicketsEmpty(state) {
      return state.tickets.length > 0
    },

    getAllTickets(state) {
      return state.tickets
    },

    getTicketById(state) {
      return (ticketId) => state.tickets.find((ticked) => ticked.id === ticketId)
      // state.tickets[ticketId] <- essa solução só se fosse obj...
    },
  },
}
