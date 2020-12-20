<template>
  <div id="spinner" :style="style"></div>
</template>

<script>
export default {
  name: 'spinnter',
  props: {
    size: {
      type: String,
      default: '18px'
    },
    primaryColor: {
      type: String,
      default: '#fff'
    },
    secondaryColor: {
      type: String,
      default: 'rgba(#fff, 0.4)'
    }
  },
  computed: {
    style: function () {
      return {
        width: this.size,
        height: this.size,
        border: `2px solid ${this.secondaryColor}`,
        'border-top-color': this.primaryColor
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#spinner {
  // Border
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