export default {
  state: {
    currentSort: "name",
    currentSortDir: "asc"
  },
  mutations: {
    changeCurrentSort(state, payload) {
      if (payload === state.currentSort) {
        state.currentSortDir = state.currentSortDir === "asc" ? "desc" : "asc";
      }
      state.currentSort = payload;
    }
  },
  actions: {
    changeCurrentSort({ commit }, e) {
      commit("changeCurrentSort", e);
    }
  },
  getters: {
    getCurrentSort: state => state.currentSort,
    getCurrentSortDir: state => state.currentSortDir
  }
};
