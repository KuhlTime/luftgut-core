# Setup Server

This directory contains a local web server needed to setup the weather station.

### SSL

To protect the users login data from a potential man in the middle attack the server uses a self signed SSL certificate to encrypt any information exchanged between the server and the user.
This has to be created before starting the server. The exact information is stored inside the `ssl/openssl.conf` file.

https://hackernoon.com/set-up-ssl-in-nodejs-and-express-using-openssl-f2529eab5bb

In order to set up the SSL Certificate navigate to the `ssl` directory and run the following command. You need to have `openssl` installed for this to work.

```shell
openssl req -nodes -new -x509 --config openssl.conf -keyout server.key -out server.cert
```

This creates a public-private-keypair `server.key` (private) and `server.cert` (public)

OpenSSL Config File:
https://apfelboymchen.net/gnu/notes/openssl%20multidomain%20with%20config%20files.html
https://stackoverflow.com/a/24283204/4179020
