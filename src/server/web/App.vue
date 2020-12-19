<template>
  <div id="app">
    <navbar></navbar>
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
    'navbar': NavBar
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

/* Page Fading Animation */

.page-enter-active,
.page-leave-active {
  transition: opacity 250ms, transform 250ms;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>