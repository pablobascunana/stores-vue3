import { createStore } from 'vuex'

export default createStore({
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
})
