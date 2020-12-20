<template>
  <div id="dashboard">
    <container center>
      <div class="grid">
        <card>
          <h3>Sensoren</h3>
        </card>
      </div>
    </container>
  </div>
</template>

<script>
import Container from '../components/Container'
import CardView from '../components/CardView'

export default {
  name: 'dashboard',
  components: {
    container: Container,
    card: CardView
  }
}
</script>

<style lang="scss" scoped>
.grid {
  // Position
  margin: 24px 0;

  // Display
  display: grid;
  grid-template-columns: 45%;
}
</style>