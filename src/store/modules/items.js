const user = {
  state: {
    showAddItemModal: false,
    showDeleteItemModal: false,
    showEditItemModal: false
  },
  mutations: {
    setShowAddItemModal(state, visible) {
      state.showAddItemModal = visible;
    },
    setShowDeleteItemModal(state, visible) {
      state.showDeleteItemModal = visible;
    },
    setShowEditItemModal(state, visible) {
      state.showEditItemModal = visible;
    }
  }
}

export default user;