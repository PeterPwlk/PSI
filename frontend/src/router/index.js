import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sidebar from "../components/Sidebar";
import GeneratePlan from "../views/GeneratePlan";
import store from '../store/index';
import Raports from "../views/Raports";
import Plans from "../views/Plans";
import PlansFilter from "../components/PlansFilter";
import Groups from "../views/Groups";

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
    path: '/raports',
    name: 'raports',
    components: {
      default: Raports,
    }
  },
  {
    path: '/plans',
    name: 'plans',
    components: {
      default: Plans,
      side: PlansFilter
    }
  },
  {
    path: '/plan/:id',
    name: 'plan',
    components: {
      default: Groups,
      side: PlansFilter
    }
  },
  {
    path: '/login',
    name: 'login'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach(async (to, from, next) => {
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
