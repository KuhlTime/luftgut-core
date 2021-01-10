<template>
  <div id="dashboard">
    <container center>
      <div class="divider">
        <h3>Übersicht</h3>
      </div>
      <div class="grid x2">
        <card title="Station">
          <p>
            Gerätenummer: <span class="monospace">{{ data.deviceId }}</span>
          </p>
        </card>
        <card title="WLAN">
          <p>Vebunden mit: <span class="monospace">24.ERROR</span></p>
        </card>
      </div>
      <button id="forceUpdateBtn">Upload Auslösen</button>
      <div class="divider">
        <h3>Hooks</h3>
      </div>
      <div class="grid x1">
        <hook
          v-for="capability in capabilities"
          :key="capability.id"
          :capability="capability"
        ></hook>
      </div>
    </container>
  </div>
</template>

<script>
import Container from '../components/Container'
import CardView from '../components/CardView'
import HookView from '../components/HookView'

export default {
  name: 'dashboard',
  components: {
    container: Container,
    card: CardView,
    hook: HookView
  },
  computed: {
    data: function () {
      return this.$store.state.updateMessage
    },
    capabilities: function () {
      return this.data.capabilities
    }
  }
}
</script>

<style lang="scss" scoped>
#dashboard {
  // Display
  overflow-y: scroll;
}

.grid {
  // Position
  margin: 24px 0;

  // Display
  display: grid;
  gap: 12px;
}

.x1 {
  grid-template-columns: 1fr;
}

.x2 {
  grid-template-columns: 1fr 1fr;
}

.x3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.monospace {
  font-family: monospace;
  font-size: 14px;
}

.divider {
  text-align: left;
  color: rgba(black, 0.2);
  border-bottom: 1px solid rgba(black, 0.2);
  text-transform: uppercase;
  font-size: 16px;
  margin: 0;
  margin-top: 60px;
}

.divider:first-of-type {
  margin-top: 42px;
}

#forceUpdateBtn {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  font-weight: 600;
  transition: all ease-in-out 300ms;

  &:hover {
    background-color: #2980b9;
  }
}
</style>