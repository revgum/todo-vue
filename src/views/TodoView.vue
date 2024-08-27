<script setup lang="ts">
import { apiStore } from '@/lib/stores/api';
import { storeToRefs } from 'pinia';
import TodoPage from '../components/todo/TodoPage.vue';
import LoginForm from '@/components/LoginForm.vue';

const { apiLoggedIn } = storeToRefs(apiStore());
</script>

<template>
  <LoginForm v-if="!apiLoggedIn" />
  <TodoPage v-else />
</template>
