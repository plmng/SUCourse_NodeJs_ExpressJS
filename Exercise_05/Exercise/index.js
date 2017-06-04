let db = require('./database');
let instanodeDb = require('./instanode-db');

const MIN_DATE = new Date(-8640000000000000);
const MAX_DATE = new Date(8640000000000000);
let minDate = '',
    maxDate = '',
    results = 10;


db().then(() => {
    //  console.log('***** ADD IMAGE *****')
    //instanodeDb.saveImage({
    //  url: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
    //description: 'such cat much wow 2',
    //tags: ['cat', 'kitty', 'cute', 'catstagram']
    //});

    // console.log('***** SEARCH BY TAG CAT *****');
    //instanodeDb.findByTag('cat');

    console.log('***** SEARCH BY CREATION DATE *****');
    instanodeDb.filter().then((images) => {
        images.forEach(i => console.log(i));
    });
})