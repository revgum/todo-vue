<script setup lang="ts">
import { getTodos } from '@/lib/api/todo';
import { apiStore } from '@/lib/apiStore';
import { useQuery } from '@tanstack/vue-query';
import TodoList from './TodoList.vue';
import TodoForm from './TodoForm.vue';
import { QUERY_KEYS } from '@/lib/constants';

const store = apiStore();

const { data } = useQuery({
  queryKey: [QUERY_KEYS.todo.list, store.password],
  queryFn: getTodos,
  initialData: { todos: [] },
});
</script>

<template>
  <TodoForm />
  <TodoList v-if="data.todos.length" :todos="data.todos" />
  <div v-else class="text-gray p-8">Nothing left todo.</div>
</template>
