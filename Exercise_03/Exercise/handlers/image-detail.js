const fs = require('fs');
const query = require('querystring');
const db = require('../database/database');

module.exports = (req, res) => {
    let reqGetMethod = req.method === 'GET';
    let reqPath = req.path.startsWith('/images/details/');
    if (reqGetMethod && reqPath) {
        fs.readFile('./views/image-detail.html', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return true;
            }
            let parts = req.path.split('/');
            let id = parts[parts.length - 1];
            let image = db.getImageById(id);
            let result = '';
            if (!image) {
                result += "Sorry, no such image in the database!"
            } else {
                result += `
            <img src="${image.url}" alt="${image.name}" >
            <br>
            <h2>${image.name}</h2>
            `
            }

            data = data.replace('{{content}}', result);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(data);
            res.end();
        })
    } else {
        return true;
    }
}