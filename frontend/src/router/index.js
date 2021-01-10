import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sidebar from "../components/Sidebar";
import GeneratePlan from "../views/GeneratePlan";
import {login} from "../../httpService/httpService";
import store from '../store/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: Home,
      side: Sidebar
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/generate',
    name: 'generate',
    components: {
      default: GeneratePlan
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: GeneratePlan
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach(async (to, from, next) => {
  console.log('to', to);
  if (to.name === 'login' && to.query.code) {
    try {
      await store.dispatch('login', to.query.code);
      next({ name: 'home' });
    } catch(e) {
      console.error(e);
      next({ name: 'home' });
    }
  }
  next();
});

export default router
