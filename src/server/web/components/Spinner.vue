<template>
  <div id="spinner"></div>
</template>

<script>
export default {
  name: 'spinnter'
}
</script>

<style lang="scss" scoped>
#spinner {
  // Display
  height: 18px;
  width: 18px;

  // Border
  border: 2px solid rgba(#fff, 0.4);
  border-top-color: rgba(#fff, 1);
  border-radius: 100%;

  // Animation
  animation: rotate 0.8s infinite linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>