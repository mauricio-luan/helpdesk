import axios from 'axios'

const FIREBASE_URL = import.meta.env.VITE_API_FIREBASE

//continuar mais tarde
export const createComments = async (userToken, comment) => {
  try {
    const url = `${FIREBASE_URL}/ticket-comments/${comment.ticketId}.json?auth=${userToken}`
    await axios.post(url, comment)
  } catch (error) {
    console.error(error)
    throw error
  }
}
