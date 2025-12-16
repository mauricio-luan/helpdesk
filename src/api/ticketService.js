import axios from 'axios'
import { db } from '@/plugins/firebase'
import { generateNextProtocol } from '@/helpers/generateProtocol'
import { handleApiError } from '@/utils/errors'

export const createTicket = async (userToken, ticket) => {
  try {
    const url = `${db.app.options.databaseURL}/tickets.json?auth=${userToken}`
    const protocol = await generateNextProtocol()

    await axios.post(url, {
      ...ticket,
      status: 'open',
      createdAt: new Date().toISOString(),
      protocol: protocol,
    })
  } catch (error) {
    handleApiError(error)
  }
}

export const updateTicket = async (userToken, ticket) => {
  try {
    const url = `${db.app.options.databaseURL}/tickets/${ticket.id}.json?auth=${userToken}`
    await axios.put(url, ticket)
  } catch (error) {
    handleApiError(error)
  }
}

export const createLog = async (userToken, ticketLog) => {
  try {
    const url = `${db.app.options.databaseURL}/ticket-history/${ticketLog.ticketId}.json?auth=${userToken}`
    await axios.post(url, ticketLog)
  } catch (error) {
    handleApiError(error)
  }
}

export const getTickets = async (userToken) => {
  try {
    const response = await axios.get(`${db.app.options.databaseURL}/tickets.json?auth=${userToken}`)

    if (response.data === null) return []

    return Object.entries(response.data).map(([id, data]) => ({ id, ...data }))
  } catch (error) {
    handleApiError(error)
  }
}

export const getTicketById = async (ticketId, userToken) => {
  try {
    const response = await axios.get(
      `${db.app.options.databaseURL}/tickets/${ticketId}.json?auth=${userToken}`,
    )

    return {
      id: ticketId,
      ...response.data,
    }
  } catch (error) {
    handleApiError(error)
  }
}

export const getTicketLog = async (userToken, ticketId) => {
  try {
    const response = await axios.get(
      `${db.app.options.databaseURL}/ticket-history/${ticketId}.json?auth=${userToken}`,
    )

    return response.data
  } catch (error) {
    handleApiError(error)
  }
}
