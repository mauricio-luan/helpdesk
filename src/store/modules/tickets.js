import * as ticketService from '@/api/ticketService'
import { ticketStatus } from '@/constants/constants'

export default {
  namespaced: true,

  state: {
    tickets: [],
    currentTicket: {},
    isNecessaryUpdateTickets: false,
  },

  mutations: {
    setTickets(state, payload) {
      state.tickets = payload
    },

    setCurrentTicket(state, payload) {
      state.currentTicket = payload
    },

    setUpdateTickets(state, payload) {
      state.isNecessaryUpdateTickets = payload
    },
  },

  actions: {
    async fetchTickets(context) {
      try {
        const tickets = await ticketService.getTickets()

        context.commit('setTickets', tickets)
        context.commit('setUpdateTickets', false)
      } catch (error) {
        console.error('fetchTickets: ', error)
        throw error
      }
    },

    async fetchTicket(context, ticketId) {
      try {
        const ticket = await ticketService.getTicketById(ticketId)

        context.commit('setCurrentTicket', ticket)
      } catch (error) {
        console.error('fetchTicket: ', error)
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
        console.error('initializeTicketDetails:', error)
        throw error
      }
    },

    async updateTicket(context, ticket) {
      try {
        const currentTicket = context.getters.getCurrentTicket

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

          await ticketService.updateTicket(ticket)
          await ticketService.createLog(log)

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
        .filter((ticket) => ticket.status != ticketStatus.deleted)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },

    getTicketById(state) {
      return (ticketId) => state.tickets.find((ticked) => ticked.id === ticketId)
    },

    getCurrentTicket(state) {
      return state.currentTicket
    },

    isNecessaryUpdateTickets(state) {
      return state.isNecessaryUpdateTickets
    },

    /*
    Aqui nesse getter eu to pegando o content inicial do ticket e misturando
    com os comments, em um array, pra poder usar no componente v-timeline
    Ja retorno ordenado por data de criação
    */
    ticketContent(state, getters, rootState, rootGetters) {
      const ticket = getters.getCurrentTicket
      const comments = rootGetters['comments/getAllComments']

      const ticketAsComment = {
        id: 'root-content',
        content: ticket.content,
        createdAt: ticket.createdAt,
        createdBy: ticket.authorEmail,
      }

      const timeline = [ticketAsComment, ...comments]
      return timeline.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },
  },
}
