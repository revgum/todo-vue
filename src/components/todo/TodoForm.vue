<script setup lang="ts">
import { addTodo, updateTodo } from '@/lib/api/todo';
import { QUERY_KEYS } from '@/lib/constants';
import { todoStore } from '@/lib/stores';
import type { Todo } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { DateTime } from 'luxon';
import { storeToRefs } from 'pinia';
import { onUpdated, ref } from 'vue';

const { editTodo } = storeToRefs(todoStore());

const queryClient = useQueryClient();

const { mutate } = useMutation({
  mutationFn: (todo: Partial<Todo>) => (todo.id ? updateTodo(todo) : addTodo(todo)),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.todo.list] });
    id.value = '';
    title.value = '';
    dueAt.value = DateTime.fromISO(DateTime.now().toISO()).toFormat('yyyy-MM-dd');
  },
});

const id = ref();
const title = ref();
const dueAt = ref(DateTime.fromISO(DateTime.now().toISO()).toFormat('yyyy-MM-dd'));

onUpdated(() => {
  // Update refs to match the todo being edited
  if (editTodo.value) {
    id.value = editTodo.value?.id;
    title.value = editTodo.value?.title;
    dueAt.value = editTodo.value?.dueAt!;
    editTodo.value = undefined;
  }
});
</script>

<template>
  <form action="#" class="flex flex-row justify-center items-center pt-4">
    <!-- Make the template react to updates in the store by explicitly binding to editTodo here -->
    <input type="hidden" :value="editTodo?.id" />
    <div class="px-2">
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Task</label>
      <input id="title" type="text" name="title" v-model="title" class="w-96" />
    </div>
    <div class="px-2">
      <label for="dueAt" class="block mb-2 text-sm font-medium text-gray-900">Due</label>
      <input id="dueAt" type="date" name="dueAt" v-model="dueAt" />
    </div>
    <button
      type="submit"
      @click.stop.prevent="mutate({ id, title, dueAt })"
      class="mt-6 ml-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      {{ id ? 'Update' : 'Create' }}
    </button>
  </form>
</template>
