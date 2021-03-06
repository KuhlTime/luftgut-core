<template>
  <div id="login">
    <div class="left-panel">
      <img id="logo" src="../assets/logo.svg" alt="Logo" class="center" />
    </div>
    <div class="right-panel" v-if="!isLoading">
      <form class="center" @submit="submit">
        <h1>Willkommen</h1>
        <p>Logge dich mit deinem Luftgut Account ein.</p>
        <input
          type="email"
          v-model="email"
          name="Email"
          placeholder="E-Mail"
          :disabled="isLoading"
        />
        <br />
        <input
          type="password"
          v-model="password"
          name="Password"
          placeholder="Passwort"
          :disabled="isLoading"
        />
        <br />
        <button type="submit" @submit="submit" :disabled="!isValid">
          <spinner class="loading-spinner" v-if="isLoading"></spinner>
          <span v-if="!isLoading">Login</span>
        </button>
        <button @click="enterDemo">
          <span v-if="!isLoading">Demo Account</span>
        </button>
      </form>
      <!--<div class="bottom">
        <p id="register" class="btn">Keinen Account?</p>
        <p id="lostPassword">Passwort vergessen?</p>
      </div>-->
    </div>
    <div class="right-panel" v-if="isLoading">
      <div class="center">
        <p>Laden</p>
        <spinner
          primary-color="black"
          secondary-color="rgba(0,0,0,0.4)"
          class="center-horizontally"
        ></spinner>
      </div>
    </div>
  </div>
</template>

<script>
import Container from '../components/Container'
import Spinner from '../components/Spinner'

import socket from '../websocket'
import { LoginMessage } from '../../../models/messages'

export default {
  name: 'login',
  components: { container: Container, spinner: Spinner },
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit: function () {
      event.preventDefault()

      if (!this.isValid) return

      this.$store.commit('setLoading', true)

      setTimeout(() => {
        const loginMessage = new LoginMessage(this.email, this.password)
        socket.emit('login', loginMessage)
      }, 2000)
    },
    enterDemo: function () {
      this.email = 'andre.kuhlmann@study.hs-duesseldorf.de'
      this.password = '12345678'
    }
  },
  computed: {
    /**
     * Checks if the input is valid
     * @returns {boolean} Returns a boolean that is true when the input is valid
     */
    isValid: function () {
      return this.email.length !== 0 && this.password.length !== 0
    },

    /**
     * Return whether the page is loading
     */
    isLoading: function () {
      // isAuthorized prevents the form to flash
      return this.$store.getters.isLoading
    },

    /**
     * Generate the Message Payload
     */
    loginPayload: function () {
      return new Login(this.email, this.password)
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  // Display
  display: flex;
  height: 100vh;
  overflow: hidden;

  // Text
  text-align: left;
}

.left-panel {
  // Position
  position: relative;

  // Display
  width: 100%;
  height: 100%;
  flex-shrink: 2;

  // Background
  background-image: url('../assets/bg.svg');
  background-repeat: repeat-x;
  background-size: cover, contain;
}

.right-panel {
  position: relative;

  // Display
  width: 40%;
  min-width: 400px;

  // Text
  text-align: center;
}

.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
}

form {
  // Position
  margin-top: 24px;
  padding-bottom: 64px;

  // Dipslay
  width: 100%;
}

input {
  // Position
  margin-top: 12px;
  padding: 6px 12px;

  // Display
  box-sizing: border-box;
  width: 80%;
  border: 1px solid #bbb;
  border-radius: 4px;

  &:disabled {
    // Display
    border: 1px solid #eee;

    // Font
    color: #ddd;
  }
}

button {
  // Position
  margin: 0;
  margin-top: 12px;
  padding: 8px 12px;

  // Display
  width: 80%;
  border: none;
  border-radius: 4px;

  // Text
  color: white;
  font-weight: 600;
  line-height: 22px;

  // Background
  background-color: rgb(0, 122, 255);

  // Transition
  transition: all ease-in-out 300ms;

  // Cursor
  cursor: pointer;

  &:disabled {
    // Background
    background-color: lightgray;

    // Cursor
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    // Background
    background-color: darken(rgb(10, 132, 255), 10%);
  }
}

.center {
  // Position
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  // Text
  text-align: center;
}

.center-horizontally {
  // Position
  margin: 0 auto;
}

.loading-spinner {
  // Position
  margin: 0 auto;
}

#logo {
  // Display
  width: 90%;
  max-width: 200px;
}

@media (max-width: 500px) {
  #logo {
    display: none;
  }
}

.btn {
  // Cursor
  cursor: pointer;

  // Transition
  transition: all ease-in-out 300ms;

  &:hover {
    color: gray;
  }
}
</style>