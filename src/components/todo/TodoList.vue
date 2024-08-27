<script setup lang="ts">
import type { Todo } from '@/lib/types';
import { CheckCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import * as stores from '@/lib/stores';
import ActionButton from './ActionButton.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { deleteTodo, updateTodo } from '@/lib/api/todo';
import { QUERY_KEYS } from '@/lib/constants';
import { DateTime } from 'luxon';

const props = defineProps<{
  todos: Todo[];
}>();

const todoStore = stores.todoStore();

const queryClient = useQueryClient();

const { mutate: deleteMutate } = useMutation({
  mutationFn: (id: Todo['id']) => deleteTodo(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.todo.list] });
  },
});

const { mutate: completeMutate } = useMutation({
  mutationFn: (id: Todo['id']) => {
    return updateTodo({ id, completedAt: DateTime.now().toISO() });
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.todo.list] });
  },
});
</script>

<template>
  <article
    v-for="todo in props.todos"
    :key="todo.id"
    class="sm:max-w-screen-md mx-auto p-6 mt-6 text-base bg-white rounded-lg"
  >
    <header class="flex justify-between items-center mb-2 text-sm text-gray-600">
      <time pubdate :datetime="todo.dueAt" :title="todo.dueAt"
        >Due: {{ DateTime.fromISO(todo.dueAt).toFormat('DD') }}</time
      >
      <time
        v-if="todo.completedAt"
        pubdate
        :datetime="todo.completedAt"
        :title="todo.completedAt"
        class="!ml-auto"
        >Complete: {{ DateTime.fromISO(todo.completedAt).toFormat('DD') }}</time
      >
    </header>
    <p class="text-gray-500">{{ todo.title }}</p>
    <div class="flex items-center mt-4 space-x-4">
      <ActionButton
        v-if="!todo.completedAt"
        class="text-green-500"
        @click="completeMutate(todo.id)"
      >
        <CheckCircleIcon class="size-4 mr-2" />
        Complete
      </ActionButton>
      <ActionButton
        v-if="!todo.completedAt"
        class="text-gray-400"
        @click="todoStore.editTodo = todo"
      >
        <PencilSquareIcon class="size-4 mr-2" />
        Edit
      </ActionButton>
      <ActionButton class="!ml-auto text-red-500" @click="deleteMutate(todo.id)">
        <TrashIcon class="size-4 mr-2" />
        Delete
      </ActionButton>
    </div>
  </article>
</template>
