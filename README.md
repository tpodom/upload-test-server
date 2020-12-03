# upload-test-server
Basic file upload server to reproduce curl 7.73.0 for Windows upload performance issue.

Powered by [hapi](https://hapijs.com).
Forked from [upload-test-server](https://github.com/trading-peter/upload-test-server).

## Install

`npm install`

## Run it

`node index.js`

Starts the server on 0.0.0.0:8989 and accepts file uploads at http://<host>:8989/upload.

Uploads are written to the current directory.

