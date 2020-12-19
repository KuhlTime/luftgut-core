# luftgut-core

## Setup

Um den Nutzer und seine Daten zu schützen ist eine Verbindung mit dem Webserver ausschließlich über eine `https` Verbindung möglich. Für die Verwendung des https Protokolles ist es notwendig zuvor ein SSL Zertifikat zu generieren.

```shell
cd src/server/ssl
```

```shell
openssl req -newkey rsa -new -config openssl.conf -out csr.pem
```

```shell
openssl x509 -req -in csr.pem -signkey key.pem -out server.cert
```

Da es sich um ein "Self Signed" Zertifikat handelt wird der Browser vor dem Verbinden mit dieser Webseite warnen. Solange niemand zu dem Raspberry Pi und dem darauf gespeicherten Schlüsselpaar zugang hat, hat der Nutzer hier nichts zu befürchten.

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
