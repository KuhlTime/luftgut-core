# Setup Server

This directory contains a local web server needed to setup the weather station.

https://hackernoon.com/set-up-ssl-in-nodejs-and-express-using-openssl-f2529eab5bb

```shell
openssl req -newkey rsa -new -config openssl.conf -out csr.pem
openssl x509 -req -in csr.pem -signkey key.pem -out server.cert
```

This creates a public-private-keypair `server.key` (private) and `server.cert` (public)

OpenSSL Config File:
https://apfelboymchen.net/gnu/notes/openssl%20multidomain%20with%20config%20files.html
https://stackoverflow.com/a/24283204/4179020
