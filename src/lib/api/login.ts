import { API_BASE_URL } from '../constants';
import { apiStore } from '../stores/api';

const store = apiStore();

export const login = () => async () => {
  if (!store.password) {
    store.$patch({
      apiError: undefined,
      apiStatus: 0,
      password: undefined,
    });
    throw new Error('Token not set');
  }

  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ password: store.password }),
    credentials: 'include',
  });

  if (!response.ok) {
    const apiError = response.status.toString();
    store.$patch({
      apiError,
      apiStatus: response.status,
    });
    throw new Error(response.statusText);
  }

  store.$patch({
    apiError: undefined,
    apiStatus: response.status,
    password: store.password,
  });

  return response.ok;
};
