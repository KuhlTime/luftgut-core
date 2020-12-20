<template>
  <div
    class="container"
    :style="{ 'max-width': maxWidth, width: width }"
    :class="{ left, center, right, debug }"
  >
    <slot />
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
    center: Boolean,
    left: Boolean,
    right: Boolean,
    debug: Boolean
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

.left {
  margin-left: 0;
  margin-right: auto;
}

.center {
  // Position
  margin-left: auto;
  margin-right: auto;
}

.right {
  margin-left: auto;
  margin-right: 0;
}

.debug {
  border: 1px dashed red;
}
</style>

