import { API_BASE_URL } from '../constants'
import { apiStore } from '../apiStore'

const store = apiStore()

export const login = () => async () => {
  if (!store.apiToken) {
    store.$patch({
      apiError: undefined,
      apiStatus: 0,
      apiToken: undefined
    })
    throw new Error('Token not set')
  }

  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ password: store.apiToken }),
    credentials: 'include'
  })

  if (!response.ok) {
    const apiError = response.status.toString()
    store.$patch({
      apiError,
      apiStatus: response.status
    })
    throw new Error(response.statusText)
  }

  store.$patch({
    apiError: undefined,
    apiStatus: response.status,
    apiToken: store.apiToken
  })

  return response.ok
}
