<template>
  <div id="dashboard">
    <container center>
      <div class="divider">
        <h3>Übersicht</h3>
      </div>
      <div class="grid x2">
        <card title="Station">
          <p>
            Gerätenummer: <span class="monospace">{{ data.deviceId }}</span> Update Interval:
            <span class="monospace">Alle {{ data.updateIntervalSeconds }}s</span>
          </p>
        </card>
        <card title="WLAN">
          <p>
            Vebunden mit: <span class="monospace">{{ data.wifiName }}</span>
          </p>
          <p>IP: <span class="monospace">192.168.178.123</span></p>
        </card>
      </div>
      <button id="forceUpdateButton" class="btn" @click="forceUpload">Upload Auslösen</button>
      <button id="logoutButton" class="btn" @click="logout">Logout</button>
      <!--<div class="divider">
        <h3>Server Log</h3>
      </div>
      <log></log>-->
      <div class="divider">
        <h3>Data Hooks</h3>
      </div>
      <p class="subtitle">
        Trage hier die Funktion ein die du verwenden möchtest um deinen Wert zu erhalten. Deiner
        Kreativität sind hier keine Grenzen gesetzt!
        <br />
        <br />
        <a href="/instructions">Mehr Infos zu den Data Hooks</a>
      </p>
      <div class="grid x1" v-if="renderComponent">
        <hook v-for="hook in hooks" :key="hook.capability.id" :hook="hook"></hook>
      </div>
    </container>
  </div>
</template>

<script>
import Container from '../components/Container'
import CardView from '../components/CardView'
import HookView from '../components/HookView'
import Log from '../components/Log'

import io from '../websocket'

export default {
  name: 'dashboard',
  components: {
    container: Container,
    card: CardView,
    hook: HookView,
    Log
  },
  data: () => ({
    renderComponent: true
  }),
  created() {
    this.unwatch = this.$store.watch(
      state => state.updateMessage,
      () => {
        this.forceRerender()
      }
    )
  },
  beforeDestroy() {
    this.unwatch()
  },
  computed: {
    data: function () {
      return this.$store.state.updateMessage
    },
    hooks: function () {
      return this.data.hooks
    }
  },
  methods: {
    forceUpload() {
      io.emit('forceUpload')
    },
    logout() {
      io.emit('logout')
    },
    forceRerender() {
      // Remove my-component from the DOM
      this.renderComponent = false

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#dashboard {
  position: absolute;

  // Display
  height: calc(100% - 42px);
  width: 100%;
  box-sizing: border-box;
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

.btn {
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
  transition: all ease-in-out 180ms;

  &:hover {
    background-color: #2980b9;
  }

  &:not(:first-of-type) {
    margin-top: 12px;
  }
}

#logoutButton {
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
}

.subtitle {
  color: rgba(black, 0.4);
}

a {
  text-decoration: none;
  color: #666;
  transition: all ease-in-out 180ms;
  cursor: pointer;

  &:hover {
    color: #000;
  }
}
</style>
