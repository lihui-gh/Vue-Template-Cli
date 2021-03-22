import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import system from './modules/system';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    system
  },
  getters
});
