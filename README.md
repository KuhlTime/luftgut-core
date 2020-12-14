# luftgut-core

## NPM Scripts

```shell
npm run <command>
```

`start`<br>
Startet die Anwendung aus dem `dist` Ordner. Damit dies funktioniert muss die Anwendung vorher kompiliert worden sein.

`build`<br>
Kompiliert die Anwendung und erzeugt den JavaScript Output im `dist` Ordner.

`build:watch`<br>
Kompiliert die Anwendung sobald Änderungen am `src` Verzeichnis gemacht werden.

`lint`<br>
Dies führt ESLint aus und weißt auf eventuelle Programmierfehler hin.

`dev`<br>
Führt die Datei aus und achtet auf Änderungen an dem `src` Verzeichnis.

`dev:lint`<br>
Führt bei jeder Änderung zunächst den `lint` Befehl aus.
