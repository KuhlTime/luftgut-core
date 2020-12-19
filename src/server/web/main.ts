import 'normalize.css'
import Vue from 'vue'

import router from './router'

import App from './App.vue'

// === SETUP VUE ===

export default new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
