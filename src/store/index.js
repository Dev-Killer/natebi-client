import Vue from "vue";
import Vuex from "vuex";
import moduleAuth from "./modules/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: moduleAuth,
  },
});

export default store;
