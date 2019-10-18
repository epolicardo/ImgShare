const mongoose = require('mongoose');
const keys = require("./keys");

//const { database } = require('./keys');

mongoose.connect(keys.databaseRemota.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('DB Is conected to ' + keys.databaseRemota.name))
    .catch(err => console.error(err));
;