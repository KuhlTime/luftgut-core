import Vue from 'vue'
import Vuex from 'vuex'

import { UpdateMessage } from '../../../models/messages'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    updateMessage: undefined as UpdateMessage | undefined,
    loading: true
  },

  mutations: {
    setUpdateMessage: (state, message: UpdateMessage | undefined) => {
      state.updateMessage = message
      console.log('Recived Update')
      console.dir(message)
    },
    setLoading: state => {
      state.loading = true
    },
    setIdle: state => {
      state.loading = false
    },
    setLoading: (state, on: boolean) => {
      state.loading = on
    }
  },

  actions: {},

  getters: {
    isAuthorized(state): boolean {
      return state.updateMessage?.isAuthenticated ?? false
    },
    isLoading(state): boolean {
      return state.loading
    },
    isUpdateMessageAvailable(state): boolean {
      return state.updateMessage !== undefined
    },
    updateMessage(state): UpdateMessage | undefined {
      return state.updateMessage
    }
  }
})

export default store
