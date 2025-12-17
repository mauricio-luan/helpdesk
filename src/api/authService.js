import axios from 'axios'
import { db } from '@/plugins/firebase'
import { handleApiError } from '@/utils/errors'

const API_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL

export const createAccount = async (payload) => {
  try {
    const userData = await signup(payload)
    await saveUser(userData)
  } catch (error) {
    handleApiError(error)
  }
}

const signup = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}:signUp?key=${db.app.options.apiKey}`, {
      ...payload,
      returnSecureToken: true,
    })

    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export const signin = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}:signInWithPassword?key=${db.app.options.apiKey}`,
      { ...payload, returnSecureToken: true },
    )

    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

const saveUser = async (payload) => {
  try {
    const url = `${db.app.options.databaseURL}/users/${payload.localId}.json`

    await axios.put(url, payload)
  } catch (error) {
    handleApiError(error)
  }
}
