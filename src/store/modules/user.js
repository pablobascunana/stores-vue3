function initialUserState() {
  return {
    userName: String,
    userUuid: undefined
  }
}

const user = {
  state: initialUserState,
  mutations: {
    resetUserStore(state) {
      const initState = initialUserState();
      Object.keys(initState).forEach(key => {
        state[key] = initState[key];
      });
    },
    setUserByToken(state, token) {
      let base64url = token.split('.')[1];
      let base64 = base64url.replace('-', '+').replace('_', '/');
      let claims = JSON.parse(window.atob(base64));
      state.userUuid = claims.session.userUuid;
    },
    setUserName(state, userName) {
      state.userName = userName;
    }
  }
}

export default user;
