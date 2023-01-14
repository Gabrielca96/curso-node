//const mongoose  = require('mongoose');
//const db = require('mongoose');
const { populate } = require('./model');
const Model = require('./model');

/*const connectBD = async () => {

 try{
    await db.connect('mongodb+srv://base_datos:contrasena@cluster0.dmd6aem.mongodb.net/gabriel_db?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, 6000000);
}catch(error){
    handleerror(error); 
}
};*/

/*db.set('strictQuery', false);
db.Promise = global.Promise;
db.connect('mongodb+srv://base_datos:contrasena@cluster0.dmd6aem.mongodb.net/gabriel_db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, 6000000)
.then(() => console.log('conectado a la bd'))
.catch(e=>console.log(e));*/


//mongodb+srv://db_user:HbkDx2468@cluster0.dmd6aem.mongodb.net/?retryWrites=true&w=majority
/*db.set('strictQuery', false);
db.Promise = global.Promise;
db.connect('mongodb://127.0.0.1:27017/first_bd', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},60000)
.then(() => console.log('[db] Conectada con éxito'))
.catch(e => console.error('[db]', e));*/



function addMessage (message){
    const myMessage = new Model (message);
    myMessage.save()
};

async function getMessages(filterUser){
    return new Promise((resolve, reject)=> {
        let filter = {};
    if(filterUser !== null){
        filter = { user: filterUser};
    }
    Model.find(filter)
        .populate('user')
        .exec((error, populated) =>{
            if(error){
                reject(error);
                return false
            }

            resolve(populated)
        })
    })
    
};

async function updateText(id, message){
    const foundMessage = await Model.findOne({
        _id: id
    })

    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

function removeMessage(id){
    return Model.deleteOne({
        _id: id
    });

}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    remove: removeMessage
    // get
    // update
    // delete
}