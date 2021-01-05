import 'normalize.css'
import Vue from 'vue'

import router from './router'
import store from './store'

import './websocket'

import App from './App.vue'

// === SETUP VUE ===

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
