//Componente sera responsable de recibir la petición http, procesar la nformación y enviarla al controlador

//importo express
const express = require('express')
//importo response
const response = require('../../network/response');
//importo controlador
const controller = require('./controller');

//Se usa para separar peticiones
const router = express.Router();

//req= petición (esta en url), lo puedo leer en app -  res= respuesta, le llega al cliente
router.get('/', function (req, res){
    
    controller.getMessages()
    .then((messageList) =>{
        response.success(req, res, messageList, 200)
    })
    .catch(e => {
        response.error(req, res, "Unexpected Error", 500, e)
    })
    
});

router.delete('/', function (req, res){
    //accede parámetros por query
    console.log(req.query);
    //accede parámetros por body
    console.log(req.body);
    if (req.query.error == 'ok') {
        response.error(req, res, 'Error inesperado', 500, "Es solo una simulación")
    }else {
        response.success(req, res, 'Creado correctamente', 201)
    }
});

router.post('/', function (req, res){

    controller.addMessage(req.body.user, req.body.message)
    .then(() => {
        response.success(req, res, 'Creado correctamente', 201)
    })
    .catch(e => {
        response.error(req, res, 'Información invalida', 400, "Error en el contenido")
        
    })

    
});

//Exporto modulo como router
module.exports = router;