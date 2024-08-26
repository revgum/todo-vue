<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <v-app class="rounded rounded-md">
    <v-app-bar title="Application bar"></v-app-bar>

    <v-navigation-drawer permanent>
      <v-list nav>
        <RouterLink to="/todo">
          <v-list-item link title="Todo"> </v-list-item>
        </RouterLink>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <RouterView />
    </v-main>
    <VueQueryDevtools />
  </v-app>
</template>

<style></style>
