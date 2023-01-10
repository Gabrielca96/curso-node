const mongoose  = require('mongoose');
const db = require('mongoose');
const Model = require('./model');

mongoose.set('strictQuery', false);

//mongodb+srv://db_user:HbkDx2468@cluster0.dmd6aem.mongodb.net/?retryWrites=true&w=majority
db.Promise = global.Promise;
db.connect('mongodb+srv://base_datos:contrasena@cluster0.dmd6aem.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, 6000000)
.then(() => console.log('[db] Conectada con éxito'))
.catch(e => console.error('[db]', e));

const list = [];

function addMessage (message){
    //list.push(message);
    const myMessage = new Model (message);
    myMessage.save()
};

function getMessages(){
    return list;
};

module.exports = {
    add: addMessage,
    list: getMessages,
    // get
    // update
    // delete
}