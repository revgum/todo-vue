import { API_BASE_URL } from '../constants';

export const getTodos = () => async () => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
