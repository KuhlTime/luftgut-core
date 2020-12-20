<template>
  <div id="app">
    <navbar id="navbar" :class="{ hidden: !showNavbar }"></navbar>
    <transition name="page" mode="out-in">
      <router-view class="content"></router-view>
    </transition>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

const env = process.env.NODE_ENV || 'development'

export default {
  name: 'App',
  components: {
    navbar: NavBar
  },
  computed: {
    showNavbar: function () {
      return this.$route.meta.showNavbar
    }
  },
  mounted() {
    this.$store.commit('setLoading')

    this.$store.dispatch('fetchUser').then(success => {
      if (success) {
        console.log('App: Redirect')

        // Fake loading time to prevent flash
        setTimeout(
          () => {
            this.$router.push({ name: 'Dashboard' })
          },
          env === 'development' ? 0 : 2000
        )
      }
    })
  }
}
</script>

<style lang="scss">
* {
  -webkit-user-drag: none;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;

  // Display
  width: 100%;
  height: 100%;
  overflow: hidden;

  // Background
  background-color: rgba(0, 0, 0, 0.03);
}

#navbar.hidden {
  transition: all ease-in-out 500ms;
  height: 0;
  padding: 0;
}

// Page Fading Animation

.page-enter-active,
.page-leave-active {
  transition: opacity 250ms, transform 250ms;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>