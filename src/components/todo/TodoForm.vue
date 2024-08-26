<script setup lang="ts">
import { addTodo } from '@/lib/api/todo';
import { QUERY_KEYS } from '@/lib/constants';
import type { Todo } from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { DateTime } from 'luxon';
import { ref } from 'vue';

const props = defineProps<{
  todo?: Todo;
}>();

const queryClient = useQueryClient();

const { mutate } = useMutation({
  mutationFn: (newTodo: Partial<Todo>) => addTodo(newTodo),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.todo.list] });
  },
});

const title = ref(props.todo?.title);
const dueAt = ref(
  DateTime.fromISO(props.todo?.dueAt || DateTime.now().toISO()).toFormat('yyyy-MM-dd'),
);
</script>

<template>
  <form action="#">
    <label for="title">Title :</label>
    <input type="text" name="title" v-model="title" />
    <label for="dueAt">Due :</label>
    <input type="date" name="dueAt" v-model="dueAt" />
    <button type="submit" @click.stop.prevent="mutate({ title, dueAt })">
      {{ props.todo ? 'Update' : 'Create' }}
    </button>
  </form>
</template>
