<script setup lang="ts">
import { login } from '@/lib/api/login';
import { apiStore } from '@/lib/apiStore';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import ErrorAlert from './alerts/ErrorAlert.vue';
import FadeTransition from './util/FadeTransition.vue';

const { password, apiError } = storeToRefs(apiStore());

useQuery({
  queryKey: ['login', password],
  queryFn: login(),
  retry: false,
  refetchOnWindowFocus: false,
});

const passwordInput = ref('');
watch(passwordInput, () => {
  apiError.value = '';
});

function handleSubmit() {
  password.value = passwordInput.value;
}
</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-12 mx-auto h-max">
      <FadeTransition>
        <ErrorAlert v-if="apiError" message="Login failed, please try again." />
      </FadeTransition>
      <div class="w-full sm:max-w-md bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
            >Password</label
          >
          <input
            v-model="passwordInput"
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required
          />
        </div>
        <button
          @click.stop.prevent="handleSubmit"
          type="submit"
          class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign in
        </button>
      </div>
    </div>
  </section>
</template>
