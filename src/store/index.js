import { createStore } from 'vuex'
import user from '@/store/modules/user.js'

export default createStore({
  state: {
    accessToken: '',
    login: '',
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
  actions: {
  },
  modules: {
    user
  }
});
