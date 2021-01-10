import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        showNavbar: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
      meta: {
        showNavbar: false
      }
    },
    {
      path: '*',
      name: 'Not Found',
      component: () => import('./pages/404'),
      meta: {
        showNavbar: true
      }
    }
  ]
})

// Authentication Guard
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.isAuthorized) next({ name: 'Login' })
  else next()
})

export default router
