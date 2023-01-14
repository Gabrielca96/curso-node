const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    users: [{
        type: Schema.ObjectId,
        ref: 'User',
    }],


});

//Creo nueva colección en MongoDB, en este caso de combre "Chats" (Le agrega la 's'), y cada colección tendra documentos con la estructura de {mySchema}
const model = mongoose.model('Chat', mySchema);

//Exporto modulo a otros componentes
module.exports = model;