<template>
  <div
    class="container"
    :style="{'max-width': maxWidth, 'width': width}"
    :class="{'center': center}"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'container',
  props: {
    maxWidth: {
      type: String,
      default: '600px'
    },
    width: {
      type: String,
      default: '90%'
    },
    center: Boolean
  }
}
</script>

<style lang="scss" scoped>
.container {
  // Position
  box-sizing: border-box;

  // Display
  width: 100%;
}

.center {
  // Position
  margin-left: auto;
  margin-right: auto;
}
</style>

