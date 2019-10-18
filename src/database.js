const mongoose = require('mongoose');
const keys = require("./keys");

//const { database } = require('./keys');

mongoose.connect(keys.database.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('DB Is conected to ' + keys.database.name))
    .catch(err => console.error(err));
;