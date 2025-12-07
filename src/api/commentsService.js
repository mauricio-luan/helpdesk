import axios from 'axios'

const FIREBASE_URL = import.meta.env.VITE_API_FIREBASE

export const createComments = async (userToken, payload, ticketId) => {
  try {
    console.log('payload: ', payload)
    const url = `${FIREBASE_URL}/ticket-comments/${ticketId}.json?auth=${userToken}`
    const response = await axios.post(url, payload)

    console.log(response.data)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getComments = async (userToken, ticketId) => {
  try {
    const url = `${FIREBASE_URL}/ticket-comments/${ticketId}.json?auth=${userToken}`
    const response = await axios.get(url)

    const responseArray = Object.entries(response.data)
    const comments = responseArray.map((comment) => ({ id: comment[0], ...comment[1] }))

    console.log(comments)

    return comments
  } catch (error) {
    console.error(error)
    throw error
  }
}
