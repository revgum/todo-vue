<script setup lang="ts">
import { getTodos } from '@/lib/api/todo'
import { apiStore } from '@/lib/apiStore'
import { useQuery } from '@tanstack/vue-query'

const store = apiStore()

const { data, error, isFetching } = useQuery({
  queryKey: ['getTodos', store.apiToken],
  queryFn: getTodos()
})
</script>

<template>
  <span v-if="isFetching">Fetching : {{ isFetching }}</span>
  <span v-if="error">Error : {{ error }}</span>
  <span v-if="data">Data : {{ data }}</span>
</template>
