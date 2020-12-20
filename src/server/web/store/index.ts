import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import firebase from 'firebase/app'
import Message from '../model/Message'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: undefined as undefined | firebase.User,
    isLoading: false,
    messages: [] as [Message]
  },
  mutations: {
    setUser: (state, user?: firebase.User) => {
      state.user = user
    },
    addMessage: (state, message: Message) => {
      state.messages.push(message)
    },
    removeMessageById: (state, id: string) => {
      _.remove(state.messages, n: Message => n.id === id)
    },
    removeMessage: (commit, message: Message) => {
      commit('removeMessageById', message.id)
    },
    setLoading: (state) => {
      state.isLoading = true
    },
    setIdle: (state) => {
      state.isLoading = false
    }
  },
  actions: {
    fetchUser: function ({ commit }) {
      commit('setLoading')

      fetch('/api/user')
        .then(response => {
          const json = response.json()

          if (json.success) {
            commit('setUser', json.data.user)
            commit('setIdle')
            console.log('Recieved Login')
            return
          } else {
            console.log('No user logged in')
            commit('setUser', undefined)
            commit('setIdle')
          }
        })
        .catch(err => {
          console.error(err)
          commit('setUser', undefined)
          commit('setIdle')
        })
    }
  },
  getters: {
    isAuthorized: state => {
      return state.user !== undefined
    }
  }
})

export default store
