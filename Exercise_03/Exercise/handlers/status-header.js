const fs = require('fs');
const db = require('../database/database');

module.exports = (req, res) => {
    let statusHeader = req.headers['statusheader'];
    if (statusHeader && statusHeader === 'Full') {
        fs.readFile('./views/status.html', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let totalImages = db.getAll().length;
            data = data.replace('{{content}}', `<h1>Total images - ${totalImages}</h1>`);
            res.writeHead(200, {
                'Content-Type': 'tet/html'
            })
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
}