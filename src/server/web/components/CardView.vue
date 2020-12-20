<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'card'
}
</script>

<style lang="scss" scoped>
.card {
  padding: 20px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>