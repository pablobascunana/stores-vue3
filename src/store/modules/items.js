const user = {
  state: {
    showAddItemModal: false,
    showDeleteItemModal: false,
  },
  mutations: {
    setShowAddItemModal(state, visible) {
      state.showAddItemModal = visible;
    },
    setShowDeleteItemModal(state, visible) {
      state.showDeleteItemModal = visible;
    },
  }
}

export default user;