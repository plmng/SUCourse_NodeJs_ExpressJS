const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let connsectionString = 'mongodb://localhost:27017/mongo-exercise';

module.exports = () => {
    return new Promise((resolve, reject) => {
                mongoose.connect(connsectionString);
                let db = mongoose.connection;
                db.on('error', (err) => {
                        console.log(err);
                        reject();
                    }) //end db on error
                db.once('open', err => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Connected!')
                    resolve();
                })
                require('./models/Tag');
                require('./models/Image');
            } //end promisse function
        ) //end return promise
}