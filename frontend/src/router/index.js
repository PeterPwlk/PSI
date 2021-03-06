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
import ManageGroup from "../components/ManageGroup";
import LoginRequired from "../views/LoginRequired";
import GroupsFilter from "../components/GroupsFilter";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: Home
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
    path: '/plan/:planId/faculty/:facultyId',
    name: 'plan',
    components: {
      default: Groups,
      side: GroupsFilter
    }
  },
  {
    path: '/plan/:planId/faculty/:facultyId/group/:groupId',
    name: 'planGroup',
    components: {
      default: Groups,
      side: GroupsFilter,
      rightSidePanel: ManageGroup
    }
  },
  {
    path: '/login',
    name: 'login'
  },
  {
    path: '/login-required',
    name: 'loginRequired',
    component: LoginRequired
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
      next({ name: 'home' });
    }
  }
  if (!['home', 'loginRequired'].includes(to.name) && !store.state.authorized) {
    await store.dispatch('checkLogin');
    if(!store.state.authorized) {
      next({name: 'loginRequired'})
    }
  }
  next();
});

export default router
