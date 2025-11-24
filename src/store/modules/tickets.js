import * as ticketService from '@/api/ticketService'

export default {
  namespaced: true,

  state: {
    tickets: [],
    currentTicket: {},
  },

  mutations: {
    setTickets(state, payload) {
      state.tickets = payload
    },

    setCurrentTicket(state, payload) {
      state.currentTicket = payload
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

    async fetchTicket(context, ticketId) {
      try {
        const userToken = context.rootGetters['auth/getUserIdToken']

        const ticket = await ticketService.getTicketById(ticketId, userToken)

        context.commit('setCurrentTicket', ticket)
      } catch (error) {
        console.error(error)
        throw error
      }
    },
  },

  getters: {
    hasTickets(state) {
      return state.tickets.length > 0
    },

    getAllTickets(state) {
      return state.tickets
    },

    getTicketById(state) {
      return (ticketId) => state.tickets.find((ticked) => ticked.id === ticketId)
    },

    getCurrentTicket(state) {
      return state.currentTicket
    },
  },
}
