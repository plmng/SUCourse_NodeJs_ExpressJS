const http = require('http');
const url = require('url');
const handlers = require('./handlers');
const port = 3030;


http.createServer((req, res) => {
    req.path = url.parse(req.url).pathname;

    for (let handler of handlers) {
        if (!handler(req, res)) {
            break
        }
    }
    console.log(`Srver is runing on http://localhost:${port}/`)
}).listen(port)