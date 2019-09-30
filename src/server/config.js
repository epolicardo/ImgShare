const path = require('path');
const exphbs = require('express-handlebars');


module.exports = app => {

    //Settings
    //Especifico el puerto a utilizar
    app.set('port', process.env.PORT || 3000);
   
    //Middleware

    //Routes

    //ErrorHandlers



    return app;
} 