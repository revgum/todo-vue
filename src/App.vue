<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<template>
  <header class="bg-white">
    <nav class="border-gray-200 px-4 py-2.5">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <ul class="flex flex-col mt-4 font-medium">
          <li>
            <RouterLink to="/todo" class="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50"
              >Todo</RouterLink
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <main>
    <RouterView />
    <VueQueryDevtools />
  </main>
</template>
