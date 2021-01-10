<template>
  <div id="disconnected">
    <div class="center">
      <h1>You disconnected from the server.</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'disconnected'
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