<script setup lang="ts">
import { getTodos } from '@/lib/api/todo';
import { apiStore } from '@/lib/apiStore';
import { useQuery } from '@tanstack/vue-query';
import TodoList from './TodoList.vue';

const store = apiStore();

const { data } = useQuery({
  queryKey: ['getTodos', store.password],
  queryFn: getTodos(),
});
</script>

<template>
  <TodoList v-if="data.todos.length" :todos="data.todos" />
  <div v-else class="text-gray p-8">Nothing left todo.</div>
</template>
