<template>
  <div class="card">
    <h3 class="title" v-if="showTitle">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: String
  },
  computed: {
    showTitle: function () {
      if (this.title) {
        return this.title.length !== 0
      } else {
        return false
      }
    }
  }
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

h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(black, 0.1);
}

p {
  margin: 0;
}
</style>