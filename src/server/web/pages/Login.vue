<template>
  <div id="login">
    <div class="left-panel">
      <img id="logo" src="../assets/logo.svg" alt="Logo" class="center" />
    </div>
    <div class="right-panel">
      <form class="center" @submit="submit">
        <h1>Willkommen</h1>
        <p>Logge dich mit deinem Luftgut Account ein.</p>
        <input type="email" v-model="email" name="Email" :disabled="loading" />
        <br />
        <input type="password" v-model="password" name="Password" :disabled="loading" />
        <br />
        <button type="submit" @submit="submit" :disabled="!isValid">
          <spinner class="loading-spinner" v-if="loading"></spinner>
          <span v-if="!loading">Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Container from '../components/Container'
import Spinner from '../components/Spinner'

String.prototype.isEmpty = function () {
  return this.length === 0
}

export default {
  name: 'login',
  components: { container: Container, spinner: Spinner },
  data: () => {
    return {
      email: 'akuhltime@gmail.com',
      password: 'TestTest',
      loading: false
    }
  },
  methods: {
    submit: function () {
      event.preventDefault()
      this.loading = !this.loading
    }
  },
  computed: {
    isValid: function () {
      return !this.email.isEmpty() && !this.password.isEmpty()
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
</style>