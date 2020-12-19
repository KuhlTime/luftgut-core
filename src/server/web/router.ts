import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from './pages/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {}
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./pages/Login')
    },
    {
      path: '*',
      name: 'Not Found',
      component: () => import('./pages/404')
    }
  ]
})
