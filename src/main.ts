import './assets/main.scss';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { createApp, watch } from 'vue';
import App from './App.vue';
import router from './router';

const pinia = createPinia();

// Watch and persist all state to localStorage
watch(
  pinia.state,
  (state) => {
    const { password, ...rest } = state['api-store'];
    localStorage.setItem('piniaState', JSON.stringify({ 'api-store': rest }));
  },
  { deep: true },
);

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(pinia);
app.use(router);

app.mount('#app');
