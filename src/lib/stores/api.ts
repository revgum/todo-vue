import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const apiStore = defineStore('api-store', () => {
  // State
  const password = ref('');
  const apiError = ref('');
  const apiStatus = ref(0);

  // Getter
  const apiLoggedIn = computed(() => apiStatus.value === 200);

  return { password, apiError, apiLoggedIn, apiStatus };
});
