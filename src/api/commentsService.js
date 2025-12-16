import axios from 'axios'
import { db } from '@/plugins/firebase'

export const createComments = async (userToken, payload, ticketId) => {
  const url = `${db.app.options.databaseURL}/ticket-comments/${ticketId}.json?auth=${userToken}`
  await axios.post(url, payload)
}

export const getComments = async (userToken, ticketId) => {
  const url = `${db.app.options.databaseURL}/ticket-comments/${ticketId}.json?auth=${userToken}`
  const response = await axios.get(url)

  if (response.data === null) return []

  return Object.entries(response.data).map(([id, data]) => ({ id, ...data }))
}
