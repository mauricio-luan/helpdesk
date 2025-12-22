import axios from 'axios'
import store from '@/store/store'
import { db } from '@/plugins/firebase'

const api = axios.create({
  baseURL: db.app.options.databaseURL,
})

api.interceptors.request.use(
  (config) => {
    const token = store.getters['auth/getUserIdToken']
    if (token) {
      config.params = config.params || {}
      config.params.auth = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
