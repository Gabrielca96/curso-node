//Componente sera responsable de recibir la petición http, procesar la nformación y enviarla al controlador

//importo express
const express = require('express')

//Importo modulo externo nuevo para enviar archivos (se necesita instalar con npm i multer)
//Permite hacer gestión de archivos y guardar en memoria ese archivo
const multer = require('multer');

//importo response
const response = require('../../network/response');
//importo controlador
const controller = require('./controller');

//Se usa para separar peticiones
const router = express.Router();

//Configuro destino de archivos (seteo extensión, para que me devielva imagen y no un binario)
//El método diskStorage utiliza dos funciones para definir el destino del archivo y su nombre. 
//En la función destination el parámetro “cb” tiene como función manejar el error y establecer su ubicación.
//En la función filename el parámetro cb tiene como objetivo manejar el error también y definir el nombre del archivo.
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})

const upload = multer({
    storage: storage
})

//req= petición (esta en url), lo puedo leer en app -  res= respuesta, le llega al cliente
router.get('/', function (req, res){
    const filterMessages = req.query.chat || null;
    controller.getMessages(filterMessages)
    .then((messageList) =>{
        response.success(req, res, messageList, 200)
    })
    .catch(e => {
        response.error(req, res, "Unexpected Error", 500, e)
    })
    
});

//Se agrega upload como un midleware de express, que es un punto por donde pasara antes de entrar a la función
//son single asigno nombre del archivo
router.post('/',  upload.single('file'), function (req, res){

    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((fullMessage) => {
        response.success(req, res, fullMessage, 201)
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