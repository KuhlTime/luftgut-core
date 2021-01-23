# Setup Server

This directory contains a local web server needed to setup the weather station.

### SSL

To protect the users login data from a potential man in the middle attack the server uses a self signed SSL certificate to encrypt any information exchanged between the server and the user.
This has to be created before starting the server. The exact information is stored inside the `ssl/openssl.conf` file.

https://hackernoon.com/set-up-ssl-in-nodejs-and-express-using-openssl-f2529eab5bb

In order to set up the SSL Certificate navigate to the `ssl` directory and run the following command. You need to have `openssl` installed for this to work.

```shell
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem -config openssl.conf
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```

This creates a public-private-keypair `key.pem` (private) and `cert.pem` (public)

OpenSSL Config File:
https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/
https://apfelboymchen.net/gnu/notes/openssl%20multidomain%20with%20config%20files.html
https://stackoverflow.com/a/24283204/4179020
