<script setup lang="ts">
import type { Todo } from '@/lib/types';
import { CheckCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import ActionButton from './ActionButton.vue';

const props = defineProps<{
  todos: Todo[];
}>();
</script>

<template>
  <article
    v-for="todo in props.todos"
    :key="todo.id"
    class="sm:max-w-screen-md mx-auto p-6 mt-6 text-base bg-white rounded-lg"
  >
    <header class="flex justify-between items-center mb-2">
      <p class="text-sm text-gray-600">
        <time pubdate datetime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time>
      </p>
    </header>
    <p class="text-gray-500">{{ todo.title }}</p>
    <div class="flex items-center mt-4 space-x-4">
      <ActionButton class="text-green-500">
        <CheckCircleIcon class="size-4 mr-2" />
        Complete
      </ActionButton>
      <ActionButton class="text-gray-400">
        <PencilSquareIcon class="size-4 mr-2" />
        Edit
      </ActionButton>
      <ActionButton class="!ml-auto text-red-500">
        <TrashIcon class="size-4 mr-2" />
        Delete
      </ActionButton>
    </div>
  </article>
</template>
