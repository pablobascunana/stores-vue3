import { createStore } from 'vuex'
import user from '@/store/modules/user.js'

export default createStore({
  state: {
    accessToken: '',
    isLogin: '',
    refreshToken: '',
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
    user
  }
});
