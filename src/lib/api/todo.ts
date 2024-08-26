import { API_BASE_URL } from '../constants';
import type { Todo } from '../types';

export const getTodos = async () => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const addTodo = async (todo: Partial<Todo>) => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const deleteTodo = async (id: Todo['id']) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    credentials: 'include',
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const updateTodo = async (todo: Partial<Todo>) => {
  const response = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
    credentials: 'include',
    method: 'PATCH',
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
