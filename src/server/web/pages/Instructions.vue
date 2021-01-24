<template>
  <div id="instructions">
    <container center>
      <div class="divider">
        <h3>Hooks</h3>
      </div>

      <p>
        Hooks sind ein einfacher Weg wie du Daten von deiner Station an unsere Server senden kannst.
        <br />
        <br />
        Anders als bei herkömmlichen Wetterstationen bist du frei das zu machen wonach dir gerade
        der Sinn steht. Du möchtest keinen Bosch Sensor verwenden kein Problem programier dir
        einfach deine eigene Schnittstelle und verwende deinen eigenen Sensor.
      </p>

      <img src="../assets/required-hook.png" style="width: 100%" />
      <p style="text-align: center; font-family: monospace; font-size: 14px">Beispiel Foto</p>
      <p>
        Auf deinem Dashboard siehst du alle möglichen Charakteristiken die deine Station ansteuern
        kann.
        <br />
        <br />
        Jede Charakteristik ist über den integrierten Code Editor programmierbar. Du kannst eine
        Hook in JavaScript oder auch in TypeScript programmieren. In den Hooks kannst du Async /
        Await nutzen, wenn du einen asynchronen Porzess aufrufen möchtest. Jede Änderung an deiner
        Hook kannst du durch einen Klick auf den "Speichern"-Knopf deiner Station mitteilen.
        <br />
        <br />
        Über dem Code Editor findest du Eigenschaften der jeweiligen Charakteristik. Neben der
        erwarteten Einheit findest du dort auch, ob es sich um ein Pflichtfeld handelt (Rot
        umrandet) und welcher Rückgabe Wert von dir erwartet wird.
        <br />
        Den gewünschten Wert kannst du mit dem
        <span style="font-family: monospace; font-size: 14px">return</span> Schlüsselwort zurück
        geben. Ist der zurückgegebene Wert nicht vom oben definierten Typ ist es der Station nicht
        möglich deinen Wert hochzuladen.
        <br />
        <br />
        Charakteristiken die als Pflichtfeld markiert sind müssen einen Wert zurückgeben. Ist dies
        nicht der Fall können keine anderen Werte veröffentlicht werden.
        <br />
        <br />
        Damit deine Station die Hook auch wirklich ausführt setze den Hacken und aktiviere damit
        deine Hook.
        <br />
        <br />
        Leider gibt es momentan noch keinen Weg zu überprüfen ob dein Code funktioniert hat. Du
        kannst aber auf den Force Upload Button klicken. Dies löst einen sofortigen Upload aus.
        Kannst du deine Daten in der App oder auf der Webseite sehen hat alles funktioniert und
        deine Station läuft.
        <br />
        <br />
        <b>Speichere jede Hook einzeln</b> nach dem du sie erstellt und aktiviert hast!
      </p>
      <p>
        Das installieren von Bibliotheken ist momentan noch nicht möglich. 
        Dir stehen momentan folgende Bibliotheken zur Verfügung:
        <ul style="font-family: monospace; line-height: 24px; margin: 0; margin-top: 8px;">
          <li><a href="http://johnny-five.io" target="_blank">johnny-five</a></li>
          <li><a href="https://www.npmjs.com/package/bme280" target="_blank">bme280</a></li>
        </ul>
      </p>

      <div class="divider">
        <h3>Hook Beispiele</h3>
      </div>

      <p>Hier sind einige Beispiele die wir für dich geschrieben haben:</p>

      <h4>Standort (Einfacher Rückgabewert)</h4>
      <prism-editor
        class="my-editor"
        v-model="location"
        :highlight="highlighter"
        line-numbers
        readonly
      ></prism-editor>

      <h4>BME280 Luftdruck</h4>
      <prism-editor
        class="my-editor"
        v-model="bme280Pressure"
        :highlight="highlighter"
        line-numbers
        readonly
      ></prism-editor>

      <h4>BME280 Luftfeuchte</h4>
      <prism-editor
        class="my-editor"
        v-model="bme280Humdidity"
        :highlight="highlighter"
        line-numbers
        readonly
      ></prism-editor>

      <h4>BME280 Temperatur</h4>
      <prism-editor
        class="my-editor"
        v-model="bme280Temperature"
        :highlight="highlighter"
        line-numbers
        readonly
      ></prism-editor>
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
  },
  data: () => {
    // Stringified using: https://onlinetexttools.com/json-stringify-text
    return {
      location: 'return "Deine Stadt"',
      bme280Pressure:
        "// Import the Library\nconst bme280 = require('bme280')\n\n/**\n * Gets a data object from the sensor\n */\nasync function getData(): Promise<any> {\n  const sensor = await bme280.open()\n  const data = await sensor.read()\n\n  await sensor.close()\n\n  return data\n}\n\n/**\n * Returns the humidity in percent\n */\nconst getPressure: Promise<number> = async () => {\n  const data = await getData()\n  return data.pressure\n}\n\nreturn await getPressure()",
      bme280Temperature:
        "// Import the Library\nconst bme280 = require('bme280')\n\n/**\n * Gets a data object from the sensor\n */\nasync function getData(): Promise<any> {\n  const sensor = await bme280.open()\n  const data = await sensor.read()\n\n  await sensor.close()\n\n  return data\n}\n\n/**\n * Returns the humidity in percent\n */\nconst getTemperature: Promise<number> = async () => {\n  const data = await getData()\n  return data.temperature\n}\n\nreturn await getTemperature()",
      bme280Humdidity:
        "// Import the Library\nconst bme280 = require('bme280')\n\n/**\n * Gets a data object from the sensor\n */\nasync function getData(): Promise<any> {\n  const sensor = await bme280.open()\n  const data = await sensor.read()\n\n  await sensor.close()\n\n  return data\n}\n\n/**\n * Returns the humidity in percent\n */\nconst getHumdidity: Promise<number> = async () => {\n  const data = await getData()\n  return data.humidity\n}\n\nreturn await getHumdidity()"
    }
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js) // languages.<insert language> to return html with markup
    }
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

  text-align: left;
  font-size: 16px;

  padding-bottom: 42px;
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

h4 {
  margin: 0;
  margin-top: 24px;
  margin-bottom: 4px;
  padding: 0;
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
