import { createStore } from 'vuex';
import items from '@/store/modules/items.js';
import stores from '@/store/modules/stores.js';
import user from '@/store/modules/user.js';
import createPersistedState from "vuex-persistedstate";

function initialState() {
  return {
    accessToken: '',
    login: true,
    refreshToken: '',
    showToast: false
  }
}

export default createStore({
  state: initialState(),
  mutations: {
    resetStore (state) {
      const initState = initialState();
      this.commit('resetItemsStore');
      this.commit('resetStoresStore');
      this.commit('resetUserStore');
      Object.keys(initState).forEach(key => {
        state[key] = initState[key];
      });
    },
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
  },
  plugins: [
    createPersistedState({ storage: window.sessionStorage })
  ]
});
