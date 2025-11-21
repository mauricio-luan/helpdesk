/*
Entidade: Ticket (/tickets/{ticketHash})

id: (Hash do Firebase)
title: String
content: String
status: String (ex: "open")
createdAt: Timestamp
Snapshot do Autor:
  authorId: String (ID do usuário)
  authorEmail: String (Para exibir na lista sem buscar no banco de users)
  assignedTo: String/Null (ID do técnico responsável)

-------------------------------------

Entidade: Histórico (/ticket_history/{ticketHash}/{logHash})
action: String (ex: "criado", "assumido", "respondido")
timestamp: Timestamp
userEmail: String (Quem fez a ação)
details: String (ex: "Mudou status de Aberto para Em Análise")
*/
import axios from 'axios'

const FIREBASE_URL = import.meta.env.VITE_API_FIREBASE

export const createTicket = async (ticket) => {
  try {
    const url = `${FIREBASE_URL}/tickets.json`

    const response = await axios.post(url, {
      ...ticket,
      status: 'open',
      createdAt: new Date().toISOString(),
    })

    return response.data
  } catch (error) {
    if (error.response) {
      const ticketServiceError = error.response.data.error.message

      console.error('ticketService: ', ticketServiceError)
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
