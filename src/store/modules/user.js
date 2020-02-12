import axios from "axios";

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    setUser({ commit, dispatch }, search) {
      axios
        .get(`https://api.github.com/users/${search}`)
        .then(res => {
          commit("setError", null);
          commit("setUser", res.data);
          dispatch("setRepos", search);
        })
        .catch(err => {
          console.log(err);
          commit("setError", "Can`t find this user");
          commit("setUser", null);
          commit("setRepos", null);
        });
    }
  },
  getters: {
    getUser: state => state.user
  }
};
