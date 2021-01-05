import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import firebase from 'firebase/app'

import { io } from 'socket.io-client'

const socket = io()

socket.on('update', data => {
  console.log(data)
})

import router from '../router'
import { Message, MessageType } from '../models/Message'
import LoginPayload from '../models/LoginPayload'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: undefined as undefined | firebase.User,
    loading: false,
    messages: [] as [Message]
  },
  mutations: {
    setUser: (state, user) => {
      console.log(user)
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
      state.loading = true
    },
    setIdle: (state) => {
      state.loading = false
    }
  },
  actions: {
    fetchUser: function ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('setLoading')

        fetch('/api/user')
          .then(response => response.json())
          .then(json => {
            if (json.success) {
              const user = json.data as firebase.User

              commit('setUser', user)
              commit('setIdle')

              console.log('Recieved Login')

              resolve(true)
            } else {
              commit('setUser', undefined)
              commit('setIdle')

              console.log('No user logged in')

              resolve(false)
            }
          })
          .catch(error => {
            commit('setUser', undefined)
            commit('setIdle')

            console.error(error)

            resolve(false)
          })
      })
    },
    login: function ({ commit }, payload: LoginPayload) {
      return new Promise((resolve, reject) => {
        commit('setLoading')

        fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(json => {
          if (json.success) {
            console.log('Login Successfull')
            const user = json.data as firebase.User
            commit('setUser', user)
            commit('setIdle')
            resolve(true)
          } else {
            // commit('addMessage', new Message(MessageType.Error, 'Login', json.message || 'Unknown Error'))
            console.log(json.message)
            commit('setIdle')
            resolve(false)
          }
        })
        .catch(err => {
          console.error(err)
          commit('setIdle')
          resolve(false)
        })
      })
    }
  },
  getters: {
    isAuthorized: function(state) {
      return state.user !== undefined
    },
    isLoading: function(state) {
      console.log(state.loading)
      return state.loading
    }
  }
})

export default store
