import axios from "axios";

export default {
  state: {
    repos: null
  },
  mutations: {
    setRepos(state, payload) {
      state.repos = payload;
    }
  },
  actions: {
    setRepos({ commit }, search) {
      axios.get(`https://api.github.com/users/${search}/repos`).then(res => {
        commit("setRepos", res.data);
      });
    },
    loadRepos({ commit }) {
      commit("loadRepos");
    }
  },
  getters: {
    getRepos: state => state.repos
  }
};
