import Vue from "vue";
import Vuex from "vuex";

import repos from "./modules/repos";
import error from "./modules/error";
import sort from "./modules/sort";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { repos, error, sort, user }
});
