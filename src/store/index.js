import { createStore } from 'vuex';
import items from '@/store/modules/items.js';
import stores from '@/store/modules/stores.js';
import user from '@/store/modules/user.js';

export default createStore({
  state: {
    accessToken: '',
    login: true,
    refreshToken: '',
    showToast: false
  },
  mutations: {
    setShowToast(state, visible) {
      state.showToast = visible;
    },
    isLogin(state, visible) {
      state.login = visible;
    },
    setAccessToken(state, token) {
      state.accessToken = `Bearer ${token}`;
    },
    setRefreshToken(state, token) {
      state.refreshToken = token;
    }
  },
  modules: {
    items,
    stores,
    user
  }
});
