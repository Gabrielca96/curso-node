//Forma que tiene node de traer modulos
//Importo express
const express = require('express');
//Permite trabajar con body de la petición
const bodyParser = require('body-parser');

//Traigo rutas
//Importo routes
const router = require('./network/routes');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(router);

//middleware
//Le paso rutas a sevidos
router(app);

app.use('/app', express.static('public'));

//Escucha
app.listen(3000);
console.log('escuchando en puerto http://localhost:3000');