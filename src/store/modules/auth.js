export default {
  namespaced: true,

  state: () => ({
    isLoggedIn: false,
    user: {
      id: null,
      prenom: "",
      nom: "",
      matricule: "",
      etablissement: "",
      profile: "",
      email: "",
    },
    configCode: "OscarSierra",
  }),

  getters: {
    getLogged(state) {
      return state.isLoggedIn;
    },
    user(state) {
      return state.user;
    },
    getConfigCode(state) {
      return state.configCode;
    },
  },

  mutations: {
    SET_LOGGED(state, payload) {
      state.user = payload.user;
      state.isLoggedIn = payload.isLoggedIn;
    },
    /* SET_USER(state, user) {
            state.user = user;
        } */
  },
};
