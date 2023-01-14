//importo express
const express = require('express');
//importo network
const message = require('../components/message/network');
const user = require('../components/user/network');
const chat = require('../components/chat/network')

//Llamo a message, que llama a componente network
const routes = function(server){
    server.use('/message', message)
    server.use('/user', user)
    server.use('/chat', chat)

};

//Exporto como routes
module.exports = routes;