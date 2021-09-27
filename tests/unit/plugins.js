import { createI18n } from 'vue-i18n';
import { createRouter, createMemoryHistory } from "vue-router";
import { createStore } from 'vuex';

import Register from '@/views/Register.vue';

export const router = createRouter({ 
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register
    }
  ]
});

export const i18n = createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'es',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'es',
  messages: {}
});

export const store = createStore({
  state: {
    showToast: false
  },
  mutations: {
    setShowToast(state, value) {
      state.showToast = value;
    }
  },
  actions: {
  },
  modules: {
  }
});