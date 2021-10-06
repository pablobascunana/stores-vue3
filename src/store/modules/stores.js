const user = {
  state: {
    showAddStoreModal: false,
    showDeleteStoreModal: false,
  },
  mutations: {
    setShowAddStoreModal(state, visible) {
      state.showAddStoreModal = visible;
    },
    setShowDeleteStoreModal(state, visible) {
      state.showDeleteStoreModal = visible;
    }
  }
}

export default user;