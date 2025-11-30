import axios from 'axios'

const FIREBASE_URL = import.meta.env.VITE_API_FIREBASE

export const createTicket = async (userToken, ticket) => {
  try {
    const url = `${FIREBASE_URL}/tickets.json?auth=${userToken}`

    const data = {
      ...ticket,
      status: 'open',
      createdAt: new Date().toISOString(),
    }

    await axios.post(url, data)
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data)
    } else if (error.request) {
      throw new Error('NETWORK_ERROR')
    } else {
      throw error
    }
  }
}

export const updateTicket = async (userToken, ticket) => {
  try {
    const url = `${FIREBASE_URL}/tickets/${ticket.id}.json?auth=${userToken}`

    await axios.put(url, ticket)
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data)
    } else if (error.request) {
      throw new Error('NETWORK_ERROR')
    } else {
      throw error
    }
  }
}

export const createLog = async (userToken, ticketLog) => {
  try {
    const url = `${FIREBASE_URL}/ticket-history/${ticketLog.ticketId}.json?auth=${userToken}`

    await axios.post(url, ticketLog)
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data)
    } else if (error.request) {
      throw new Error('NETWORK_ERROR')
    } else {
      throw error
    }
  }
}

export const getTickets = async (userToken) => {
  try {
    const url = `${FIREBASE_URL}/tickets.json?auth=${userToken}`
    const response = await axios.get(url)

    if (response.data === null) return []

    const responseArray = Object.entries(response.data)
    const tickets = responseArray.map((ticket) => ({ id: ticket[0], ...ticket[1] }))

    return tickets
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data)
    } else if (error.request) {
      throw new Error('NETWORK_ERROR')
    } else {
      throw error
    }
  }
}

export const getTicketById = async (ticketId, userToken) => {
  try {
    const url = `${FIREBASE_URL}/tickets/${ticketId}.json?auth=${userToken}`
    const response = await axios.get(url)

    return {
      id: ticketId,
      ...response.data,
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data)
    } else if (error.request) {
      throw new Error('NETWORK_ERROR')
    } else {
      throw error
    }
  }
}

export const getTicketLog = async (userToken, ticketId) => {
  try {
    console.log(userToken, ticketId)
    const url = `${FIREBASE_URL}/ticket-history/${ticketId}.json?auth=${userToken}`
    const response = await axios.get(url)

    console.log(response.data)

    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data)
    } else if (error.request) {
      throw new Error('NETWORK_ERROR')
    } else {
      throw error
    }
  }
}
