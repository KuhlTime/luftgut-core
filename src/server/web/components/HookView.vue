<template>
  <card class="hook" :title="capability.nameDe">
    <p v-if="capability.unit">
      Einheit: <code>{{ capability.unit }}</code>
    </p>
    <p>
      Erwarteter Rückgabewert: <code>{{ capability.type }}</code>
    </p>
    <prism-editor
      class="my-editor"
      v-model="code"
      :highlight="highlighter"
      line-numbers
    ></prism-editor>
    <slot></slot>
  </card>
</template>

<script>
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
    capability: {
      type: Object,
      required: true
    }
  },
  data: () => ({ code: '' }),
  computed: {
    hooks: function () {
      return this.data.hooks
    }
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js) // languages.<insert language> to return html with markup
    },
    updateValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

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

p {
  margin-bottom: 8px;
}
</style>