<template>
  <div id="app">
    <navbar id="navbar" :class="{ hidden: !showNavbar }"></navbar>
    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

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
    this.$store.dispatch('fetchUser')
  }
}
</script>

<style lang="scss">
* {
  -webkit-user-drag: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
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