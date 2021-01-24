<template>
  <div id="instructions">
    <container center>
      <div class="divider">
        <h3>Übersicht</h3>
      </div>
    </container>
  </div>
</template>

<script>
import Container from '../components/Container'

import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

export default {
  name: 'instructions',
  components: {
    container: Container,
    PrismEditor
  }
}
</script>

<style lang="scss" scoped>
#instructions {
  position: absolute;

  // Display
  height: calc(100% - 42px);
  width: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
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
