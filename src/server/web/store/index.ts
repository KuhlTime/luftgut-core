import Vue from 'vue'
import Vuex from 'vuex'

import { Message, Update } from '@/models/messages'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: undefined as undefined | Message<Update>,
    loading: false
  },

  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    setLoading: state => {
      state.loading = true
    },
    setIdle: state => {
      state.loading = false
    }
  },

  actions: {},

  getters: {
    isAuthorized: function (state) {
      return state.user !== undefined
    },
    isLoading: function (state) {
      console.log(state.loading)
      return state.loading
    }
  }
})

export default store
