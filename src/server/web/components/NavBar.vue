<template>
  <nav id="navbar">
    <img id="logo" src="../assets/logo.svg" class="even-width" />
    <span v-if="showTitle" class="title">{{ title }}</span>
    <div class="even-width"></div>
  </nav>
</template>

<script>
import Container from './Container'

export default {
  name: 'navbar',
  components: {
    container: Container
  },
  computed: {
    title: function () {
      if (this.$route.name !== 'Login') {
        return this.$route.name
      } else {
        return undefined
      }
    },
    showTitle: function () {
      return this.title !== undefined
    }
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
  z-index: 100;

  // Dipslay
  display: flex;
  width: 100%;
  height: 42px;
  box-sizing: border-box;

  // Flex
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;

  // Text
  color: white;
  text-align: left;

  // Background
  background-image: url('../assets/bg.svg');
  background-repeat: repeat-x;
  background-size: contain, cover;
  // background-color: #444;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
}

#logo {
  height: 80%;
}

.title {
  font-weight: 500;
  background-color: rgba(white, 1);
  padding: 3px 18px;
  padding-top: 4px;
  border-radius: 50vh;
  color: #000;
}

.even-width {
  width: 100px;
}
</style>