const user = {
  state: {
    storeUuid: String,
  },
  mutations: {
    setStoreUuid(state, storeUuid) {
      state.storeUuid = storeUuid;
    }
  }
}

export default user;