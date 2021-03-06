import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Disconnected from './pages/Disconnected'

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
      component: Login,
      meta: {
        showNavbar: false
      }
    },
    {
      path: '/instructions',
      name: 'Anleitung',
      component: () => import('./pages/Instructions'),
      meta: {
        showNavbar: true
      }
    },
    {
      path: '/disconnected',
      name: 'Disconnected',
      component: Disconnected,
      meta: {
        showNavbar: true
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
  if (to.name === 'Disconnected') {
    console.log('Navigate to Disconnect')
    next()
  } else if (to.name !== 'Login' && !store.getters.isAuthorized) {
    next({ name: 'Login' })
  } else {
    console.log('Navigate to: ' + to.name)
    next()
  }
})

export default router
