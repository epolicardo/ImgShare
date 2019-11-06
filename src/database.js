const mongoose = require('mongoose');

const { database } = require('./keys');
mongoose.connect(database.URIRemota, {
        useNewUrlParser: true
    })
    .then(db => console.log('DB Is conected'))
    .catch(err => console.error(err));
;