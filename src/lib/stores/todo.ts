import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type Todo } from '../types';

export const todoStore = defineStore('todo-store', () => {
  // State
  const editTodo = ref<Todo | undefined>();

  return { editTodo };
});
