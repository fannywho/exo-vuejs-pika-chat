export default {
  state: {
    pika: false,
  },
  actions: {
    sayPika({ commit }) {
      commit('sayPika', true);
    },
  },
  mutations: {
    sayPika(state, pika) {
      state.pika = pika;
      setTimeout(() => {
        state.pika = false;
      }, 2000);
    },
  }
};
