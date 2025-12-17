import axios from 'axios'
import { db } from '@/plugins/firebase'
import { handleApiError } from '@/utils/errors'

export const createComments = async (userToken, payload, ticketId) => {
  try {
    const url = `${db.app.options.databaseURL}/ticket-comments/${ticketId}.json?auth=${userToken}`
    await axios.post(url, payload)
  } catch (error) {
    handleApiError(error)
  }
}

export const getComments = async (userToken, ticketId) => {
  try {
    const url = `${db.app.options.databaseURL}/ticket-comments/${ticketId}.json?auth=${userToken}`
    const response = await axios.get(url)

    if (response.data === null) return []

    return Object.entries(response.data).map(([id, data]) => ({ id, ...data }))
  } catch (error) {
    handleApiError(error)
  }
}
