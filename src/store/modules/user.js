const user = {
  state: {
    userName: String,
    userUuid: undefined
  },
  mutations: {
    setUserByToken(state, token) {
      let base64url = token.split('.')[1];
      let base64 = base64url.replace('-', '+').replace('_', '/');
      let claims = JSON.parse(window.atob(base64));
      state.userUuid = claims.session.userUuid;
    },
    setUserName(state, userName) {
      state.userName = userName;
    }
  },
  actions: {},
  getters: {}
}

export default user;