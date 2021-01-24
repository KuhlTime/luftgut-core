<template>
  <card class="hook" :class="{ required: isRequired }" :title="name">
    <p v-if="unit">
      Einheit: <code>{{ unit }}</code>
    </p>
    <p>
      Erwarteter Rückgabewert: <code>{{ type }}</code>
    </p>
    <p>
      Notwendig: <code>{{ isRequired ? 'Ja' : 'Nein' }}</code>
    </p>
    <p><input type="checkbox" v-model="active" /> {{ activeText }}</p>
    <prism-editor
      class="my-editor"
      v-model="code"
      :highlight="highlighter"
      line-numbers
    ></prism-editor>
    <!-- {{ hook.code }} -->
    <!--<button id="testButton" class="btn">Testen</button>-->
    <button @click="save" id="uploadButton" class="btn" v-if="hookHasChanged" :disabled="uploading">
      Speichern
    </button>
    <slot></slot>
  </card>
</template>

<script>
import io from '../websocket'
import { HookUpdateMessage } from '../../../models/messages'

import Card from './CardView'

import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

export default {
  name: 'hook',
  components: { card: Card, PrismEditor },
  props: {
    hook: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    initialStart: true,
    code: '',
    active: false,
    uploading: false
  }),
  computed: {
    hookHasChanged: function () {
      return this.code !== this.hook.code || this.active !== this.hook.active
    },
    capability: function () {
      return this.hook.capability
    },
    name: function () {
      return this.capability.nameDe
    },
    unit: function () {
      return this.capability.unit
    },
    type: function () {
      return this.capability.type
    },
    activeText: function () {
      return this.active ? 'Aktiviert' : 'Deaktiviert'
    },
    isRequired: function () {
      return this.hook.capability.required ?? false
    }
  },
  created: function () {
    this.code = this.hook.code
    this.active = this.hook.active
  },
  methods: {
    highlighter(code) {
      // Prevent the code from beeing transmitter on initial load
      if (this.initialStart) {
        this.initialStart = false
      } else {
        this.changeHandler(code)
      }

      return highlight(code, languages.js) // languages.<insert language> to return html with markup
    },
    save() {
      if (!this.hookHasChanged) return
      this.uploading = true

      const updatedHook = this.hook
      updatedHook.active = this.active
      updatedHook.code = this.code

      io.emit('hookUpdate', new HookUpdateMessage([updatedHook]))
    },
    changeHandler(code) {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
.required {
  border: 3px solid #e74c3c;
}

/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;
  box-sizing: border-box;
  height: auto;

  border-radius: 4px;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}

code {
  font-weight: 600;
}

p {
  margin-bottom: 8px;
}

.btn {
  width: 100%;
  height: 30px;
  margin-top: 8px;
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: #3498db;
  color: white;
  font-weight: 600;

  &:hover {
    background-color: #2980b9;
  }
}
</style>