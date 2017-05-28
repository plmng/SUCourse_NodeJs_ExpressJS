const url = require('url');
const fs = require('fs');
const path = require('path');

function getContentType(url) {
    let contentType = 'text/plain';
    if (url.endsWith('.css')) {
        contentType = 'text/css';
    } else if (url.endsWith('.js')) {
        contentType = 'application/javascript';
    } else if (url.endsWith('.jpg')) {
        contentType = 'image/jpeg';
    } else if (url.endsWith('.html')) {
        contentType = 'text/html';
    }
    return contentType;
}

let validateFileExtension = (path) => {
    console.log('validate Function', path);
    if (path.endsWith('.html') ||
        path.endsWith('.css') ||
        path.endsWith('.js') ||
        path.endsWith('.jpg')) {
        return true;
    }
    return false;
}
module.exports = (req, res) => {
    console.log(req.path.startsWith('/content'));
    console.log(validateFileExtension(req.path));
    fs.readFile('.' + req.path, (err, data) => {
        if (err ||
            req.method !== 'GET' ||
            !req.path.startsWith('/content') ||
            !validateFileExtension(req.path)) {
            res.writeHead(404);
            res.write('404 Not Found - Resource not found!')
            res.end()
            return
        }
        res.writeHead(200, {
            'Content-Type': getContentType(req.path)
        })
        res.write(data);
        res.end();
    })
}