<script setup lang="ts">
import { login } from '@/lib/api/login'
import { apiStore } from '@/lib/apiStore'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import TodoPage from '../components/todo/TodoPage.vue'

const { apiToken, apiError, apiLoggedIn } = storeToRefs(apiStore())

const { isLoading } = useQuery({
  queryKey: ['login', apiToken],
  queryFn: login(),
  retry: false
})
</script>

<template>
  <v-alert
    v-if="apiError"
    closable
    icon="$vuetify"
    title="Error"
    :text="apiError"
    type="error"
    variant="tonal"
  ></v-alert>
  <div v-if="isLoading">isLoading</div>
  <v-responsive v-if="!apiLoggedIn" class="mx-auto" max-width="344">
    <v-text-field v-model="apiToken" hide-details="auto" label="API Token" clearable></v-text-field>
  </v-responsive>
  <TodoPage v-else />
</template>
