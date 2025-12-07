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

    async initializeTicketDetails(context, ticketId) {
      try {
        const tarefas = [
          context.dispatch('fetchTicket', ticketId),
          context.dispatch('comments/fetchComments', ticketId, { root: true }),
        ]

        await Promise.all(tarefas)
      } catch (error) {
        console.error('Falha ao carregar a tela:', error)
      }
    },

    async updateTicket(context, ticket) {
      try {
        const currentTicket = context.getters.getCurrentTicket
        const userToken = context.rootGetters['auth/getUserIdToken']

        const updatedTicketKeys = Object.keys(ticket)
        const ignoredFields = ['authorId', 'authorEmail', 'createdAt', 'id']

        const updatedValues = []
        for (const key of updatedTicketKeys) {
          if (ignoredFields.includes(key)) continue

          if (ticket[key] !== currentTicket[key]) {
            updatedValues.push({
              field: key,
              from: currentTicket[key],
              to: ticket[key],
            })
          }
        }

        if (updatedValues.length > 0) {
          const log = {
            ticketId: ticket.id,
            editedBy: context.rootGetters['auth/getUserEmail'],
            date: new Date().toISOString(),
            log: updatedValues,
          }

          await ticketService.updateTicket(userToken, ticket)
          await ticketService.createLog(userToken, log)

          await context.dispatch('fetchTickets')
        }
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

    getTicketDetails(state, getters, rootState, rootGetters) {
      const ticket = getters.getCurrentTicket
      const comments = rootGetters['comments/getAllComments']

      const ticketAsComment = {
        id: 'root-ticket',
        content: ticket.content,
        createdAt: ticket.createdAt,
        createdBy: ticket.authorEmail,
      }

      return [ticketAsComment, ...comments]
    },
  },
}
