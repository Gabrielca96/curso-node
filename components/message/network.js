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
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
    .then((messageList) =>{
        response.success(req, res, messageList, 200)
    })
    .catch(e => {
        response.error(req, res, "Unexpected Error", 500, e)
    })
    
});

router.post('/', function (req, res){

    controller.addMessage(req.body.chat, req.body.user, req.body.message)
    .then(() => {
        response.success(req, res, 'Creado correctamente', 201)
    })
    .catch(e => {
        response.error(req, res, 'Información invalida', 400, "Error en el contenido")
        
    })

    
});

router.patch('/:id', function (req, res){
    controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, 'Error interno', 500, e);
    })

})

router.delete('/:id', function (req, res){
    controller.deleteMessage(req.params.id)
    .then(() => {
        response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200)
    })
    .catch(e => {
        response.error(req, res, 'Error interno', 500, e)
    })
});

//Exporto modulo como router
module.exports = router;