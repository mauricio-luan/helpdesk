import api from '@/api/axios'
import { generateNextProtocol } from '@/helpers/generateProtocol'
import { handleApiError } from '@/utils/errors'
import { ticketStatus } from '@/constants/constants'

export const createTicket = async (ticket) => {
  try {
    const protocol = await generateNextProtocol()

    await api.post('/tickets.json', {
      ...ticket,
      status: ticketStatus.waiting,
      createdAt: new Date().toISOString(),
      protocol: protocol,
    })
  } catch (error) {
    handleApiError(error)
  }
}

export const createLog = async (ticketLog) => {
  try {
    await api.post(`/ticket-history/${ticketLog.ticketId}.json`, ticketLog)
  } catch (error) {
    handleApiError(error)
  }
}

export const getTickets = async () => {
  try {
    const response = await api.get('/tickets.json')

    if (response.data === null) return []

    return Object.entries(response.data).map(([id, data]) => ({ id, ...data }))
  } catch (error) {
    handleApiError(error)
  }
}

export const getTicketById = async (ticketId) => {
  try {
    const response = await api.get(`/tickets/${ticketId}.json`)

    return { id: ticketId, ...response.data }
  } catch (error) {
    handleApiError(error)
  }
}

export const getTicketLog = async (ticketId) => {
  try {
    const response = await api.get(`/ticket-history/${ticketId}.json`)

    if (response.data === null) return []

    return Object.entries(response.data).map(([id, data]) => ({ id, ...data }))
  } catch (error) {
    handleApiError(error)
  }
}

export const updateTicket = async (ticket) => {
  try {
    await api.put(`/tickets/${ticket.id}.json`, ticket)
  } catch (error) {
    handleApiError(error)
  }
}

export const patchTicket = async (ticketId, fields) => {
  try {
    await api.patch(`/tickets/${ticketId}.json`, fields)
  } catch (error) {
    handleApiError(error)
  }
}
