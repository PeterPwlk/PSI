import Vue from 'vue'
import Vuex from 'vuex'
import {login, logout} from "../../httpService/httpService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authorized: false,
  },
  mutations: {
    SET_AUTHORIZED(state, authorized) {
      state.authorized = authorized;
    }
  },
  actions: {
    async login({ commit }, code) {
      try {
        await login(code);
        commit('SET_AUTHORIZED', true);
      } catch (e) {
        console.error('Failed to authorize', e);
        throw e;
      }
    },
    async logout({ commit }) {
      try {
        await logout();
        commit('SET_AUTHORIZED', false);
      } catch (e) {
        console.error('Failed to authorize', e);
        throw e;
      }
    }
  },
  modules: {
  }
})
