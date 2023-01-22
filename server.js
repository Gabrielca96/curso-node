//Importo express
const express = require('express');
//Levanto servidor web
const app = express();
const server = require('http').Server(app);
const cors = require('cors')
//Permite trabajar con body de la petición
const bodyParser = require('body-parser');
const socket = require('./socket')
const db = require('./db')

//Traigo rutas
//Importo routes
const router = require('./network/routes');

db('mongodb://127.0.0.1:27017/first_bd')

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(router);

socket.connect(server);

//middleware
//Le paso rutas a sevidos
router(app);

app.use('/app', express.static('public'));

//Escucha
server.listen(3000, function () {
    console.log('escuchando en puerto http://localhost:3000');

});
