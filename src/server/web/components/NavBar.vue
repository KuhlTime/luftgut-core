<template>
  <nav id="navbar">
    <img id="logo" src="../assets/logo.svg">
  </nav>
</template>

<script>
import Container from './Container'

export default {
  name: 'navbar',
  components: {
    'container': Container
  }
}
</script>

<style lang="scss" scoped>
#navbar {
  // Position
  position: sticky;
  top: 0;
  left: 0;
  padding: 6px 12px;

  // Dipslay
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  color: white;
  text-align: left;

  // Background
  background-image: url('../assets/bg.svg');
  background-repeat: repeat-x;
  background-size: contain, cover;
}

#logo {
  height: 100%;
}
</style>