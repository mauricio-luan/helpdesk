/*
Entidade: Histórico (/ticket_history/{ticketHash}/{logHash})
action: String (ex: "criado", "assumido", "respondido")
timestamp: Timestamp
userEmail: String (Quem fez a ação)
details: String (ex: "Mudou status de Aberto para Em Análise")
*/
import axios from 'axios'

const FIREBASE_URL = import.meta.env.VITE_API_FIREBASE

export const createTicket = async (ticket, userToken) => {
  try {
    const url = `${FIREBASE_URL}/tickets.json?auth=${userToken}`

    const data = {
      ...ticket,
      status: 'open',
      createdAt: new Date().toISOString(),
    }

    const response = await axios.post(url, data)

    return response.data
  } catch (error) {
    if (error.response) {
      const ticketServiceError = error.response.data

      console.error('createTicket: ', ticketServiceError)
      throw new Error(ticketServiceError)
    } else if (error.request) {
      console.error('request: ', error.request)
      throw new Error('NETWORK_ERROR')
    } else {
      console.error('Erro desconhecido: ', error)
      throw error
    }
  }
}

export const getTickets = async (userToken) => {
  try {
    const url = `${FIREBASE_URL}/tickets.json?auth=${userToken}`

    const response = await axios.get(url)

    return response.data
  } catch (error) {
    if (error.response) {
      const ticketServiceError = error.response.data

      console.error('getTickets: ', ticketServiceError)
      throw new Error(ticketServiceError)
    } else if (error.request) {
      console.error('request: ', error.request)
      throw new Error('NETWORK_ERROR')
    } else {
      console.error('Erro desconhecido: ', error)
      throw error
    }
  }
}
