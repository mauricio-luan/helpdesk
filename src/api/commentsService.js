import api from '@/api/axios'
import { handleApiError } from '@/utils/errors'

export const createComments = async (payload, ticketId) => {
  try {
    await api.post(`/ticket-comments/${ticketId}.json`, payload)
  } catch (error) {
    handleApiError(error)
  }
}

export const getComments = async (ticketId) => {
  try {
    const response = await api.get(`/ticket-comments/${ticketId}.json`)

    if (response.data === null) return []

    return Object.entries(response.data).map(([id, data]) => ({ id, ...data }))
  } catch (error) {
    handleApiError(error)
  }
}
