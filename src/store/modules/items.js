function initialItemsState() {
  return {
    showAddItemModal: false,
    showDeleteItemModal: false,
    showEditItemModal: false
  }
}

const items = {
  state: initialItemsState(),
  mutations: {
    resetStoresStore(state) {
      const initState = initialItemsState();
      Object.keys(initState).forEach(key => {
        state[key] = initState[key];
      });
    },
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

export default items;
