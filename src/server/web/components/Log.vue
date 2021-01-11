<template>
  <card id="log">
    <code v-for="log in logs" :key="log.time">
      <span class="info">[{{ log.topic }}]</span>
      <span class="message">{{ log.message }}</span>
      <br />
    </code>
  </card>
</template>

<script>
import card from './CardView'

export default {
  name: 'log',
  components: { card },
  props: {
    logs: {
      type: Object,
      default: () => [
        { time: Date.now(), topic: 'Socket.io', message: 'Connected to: Vt3u1Zq33WAOsr0EAAAC' },
        { time: Date.now(), topic: 'Socket.io', message: 'Connected to: Vt3u1Zq33WAOsr0EAAAB' },
        { time: Date.now(), topic: 'Socket.io', message: 'Connected to: Vt3u1Zq33WAOsr0EAAAA' },
        { time: Date.now(), topic: 'Socket.io', message: 'Connected to: Vt3u1Zq33WAOsr0EAAAF' },
        { time: Date.now(), topic: 'Socket.io', message: 'Connected to: Vt3u1Zq33WAOsr0EAAAF' },
        {
          time: Date.now(),
          topic: 'Socket.io',
          message: 'Connected to: Vt3u1Zq33WAOsr0EAAAF Connected to: Vt3u1Zq33WAOsr0EAAAF'
        },
        { time: Date.now(), topic: 'Socket.io', message: 'Connected to: Vt3u1Zq33WAOsr0EAAAF' },
        { time: Date.now(), topic: 'Socket.io', message: 'Connected to: Vt3u1Zq33WAOsr0EAAAF' },
        { time: Date.now(), topic: 'Socket.io', message: 'Connected to: Vt3u1Zq33WAOsr0EAAAF' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#log {
  margin-top: 24px;
  max-height: 80px;
  overflow-y: scroll;
  overscroll-behavior: contain;

  background-color: #2d2d2d;
  color: #fff;
  text-align: left;
  font-size: 14px;
}

code {
  line-height: 20px;
  display: flex;
}

.message {
  padding-left: 8px;
}

.info {
  color: #3498db;
}

.line {
  border-bottom: 1px solid rgba(white, 0.2);
}
</style>