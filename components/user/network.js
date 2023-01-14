//importo express
const express = require('express')
//importo response
const response = require('../../network/response');
//importo controlador
const controller = require('./controller');

//Se usa para separar peticiones
const router = express.Router();

router.post('/', function(req, res){
    controller.addUser(req.body.name)
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(err => {
        response.error(req, res, 'Internal error', 500, err);
    })
})

router.get('/', function (req, res) {
    const filterUser = req.query.name || null;

    controller.getUser(filterUser)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(error => {
            response.error(req, resp, 'Internal Error', 500, error);
        })
});

//Se exporta para usar en routes
module.exports = router;