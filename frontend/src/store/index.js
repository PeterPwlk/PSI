import Vue from 'vue'
import Vuex from 'vuex'
import {login, logout, ping} from "../httpService/httpService";
import router from '../router'
import {UNAUTHORIZED} from "../httpService/statusCodes";

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
        router.push({ name: 'home' }).catch(() => {});
      } catch (e) {
        console.error('Failed to logout', e);
        throw e;
      }
    },
    async checkLogin({ commit }) {
      try {
        await ping();
        commit('SET_AUTHORIZED', true);
      } catch(e) {
        if (e.statusCode !== UNAUTHORIZED) {
          console.error(e);
        }
      }
    }
  },
  modules: {
  }
})
