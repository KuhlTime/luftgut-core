<template>
  <div id="notFound">
    <div class="center">
      <h1>404</h1>
      <h2>
        {{ randomText }}
      </h2>
    </div>
  </div>
</template>

<script>
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)]
}

export default {
  name: 'not-found',
  data: () => {
    return {
      texts: ['Thats definitely not my fault!', 'Houston, we have a problem!', 'Darn it...']
    }
  },
  computed: {
    randomText: function () {
      return this.texts.random()
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  // Position
  margin-bottom: 0px;

  // Display
  color: lightgray;

  // Font
  font-size: 90px;
}

.center {
  // Position
  position: absolute;
  top: calc(50% - 42px);
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>