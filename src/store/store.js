import Vue from 'vue';
import Vuex from 'vuex';
import pikachu from './modules/pikachu';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pikachu,
  },
});
