import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL
const API_KEY = import.meta.env.VITE_AUTH_API_KEY
const FIREBASE_URL = import.meta.env.VITE_API_FIREBASE

const SIGNUP_URL = `${API_BASE_URL}:signUp?key=${API_KEY}`
// const SIGNIN_URL = `${API_BASE_URL}:signInWithPassword?key=${API_KEY}`

export const createAccount = async (payload) => {
  try {
    const userData = await signup(payload)
    await saveUser(userData)
    return userData
  } catch (error) {
    console.error('createAccount: ', error)
    throw error
  }
}

const signup = async (payload) => {
  try {
    const response = await axios.post(SIGNUP_URL, {
      ...payload,
      returnSecureToken: true,
    })
    return response.data
  } catch (error) {
    if (error.response) {
      const authError = error.response.data.error.message
      console.error('auth: ', authError)
      throw new Error(authError)
    } else if (error.request) {
      console.error('request: ', error.request)
      throw new Error('NETWORK_ERROR')
    } else {
      console.error('Erro desconhecido: ', error)
      throw error
    }
  }
}

const saveUser = async (payload) => {
  try {
    const url = `${FIREBASE_URL}/users/${payload.localId}.json`
    await axios.put(url, payload)
  } catch (error) {
    if (error.response) {
      console.error('database: ', error.response.data)
      throw new Error(error.response.data)
    } else if (error.request) {
      console.error('request: ', error.request)
      throw new Error('NETWORK_ERROR')
    } else {
      console.error('Erro desconhecido: ', error)
      throw error
    }
  }
}
