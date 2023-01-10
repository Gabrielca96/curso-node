//importo express
const express = require('express');
//importo network
const message = require('../components/message/network');

//Llamo a message, que llama a componente network
const routes = function(server){
    server.use('/message', message)

};

//Exporto como routes
module.exports = routes;