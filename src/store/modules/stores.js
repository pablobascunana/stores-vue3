function initialStoresState() {
  return {
    showAddStoreModal: false,
    showDeleteStoreModal: false,
  }
}

const stores = {
  state: initialStoresState(),
  mutations: {
    resetStoresStore(state) {
      const initState = initialStoresState();
      Object.keys(initState).forEach(key => {
        state[key] = initState[key];
      });
    },
    setShowAddStoreModal(state, visible) {
      state.showAddStoreModal = visible;
    },
    setShowDeleteStoreModal(state, visible) {
      state.showDeleteStoreModal = visible;
    }
  }
}

export default stores;
